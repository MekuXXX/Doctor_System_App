"use server";
import { db } from "@/lib/db";
import {
  AddDoctorSchemaType,
  EditDoctorSchemaType,
  EditUserSchemaType,
  addDoctorSchema,
  editDoctorSchema,
  editUserSchema,
} from "@/schemas/doctor";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import bcrypt from "bcryptjs";
import { cwd } from "process";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import {
  DoctorDetailsSchemaType,
  doctorDetailsSchema,
} from "@/schemas/doctorDetails";
import { DEFAULT_IMG } from "@/lib/constants";
import moment from "moment";
import { SessionType } from "@prisma/client";
import { PaymentData } from "@/components/main/CheckoutForm";
import { createWherebyUrl } from "@/actions/whereby";
import { v4 as uuidV4 } from "uuid";
import { getNotificationDate } from "@/lib/moment";
import { pusherServer } from "@/lib/pusher";
import { sendSessionNotification } from "@/lib/notification";
import { createConversation } from "@/lib/message";

export const getDoctors = async () => {
  try {
    const doctors = await db.user.findMany({
      where: { role: "DOCTOR" },
      select: {
        id: true,
        name: true,
        image: true,
        DoctorData: {
          select: {
            id: true,
            article: true,
            breif: true,
            country: true,
            doctorActive: {
              select: { isActive: true, from: true, to: true },
            },
            master: { select: { name: true } },
            Rate: true,
            doctorRank: true,
            certificate: true,
          },
        },
      },
    });
    if (!doctors)
      return { error: "البيانات الذى أدخلتها غير صحيحه للحصول على الأطباء" };
    return { success: "نجح الحصول على الأطباء", data: doctors };
  } catch {
    return { error: "حدث خطأ أثناء الوصول لبيانات الأطباء" };
  }
};

export const getSelectDoctors = async () => {
  try {
    const data = await db.user.findMany({
      where: { role: "DOCTOR" },
      select: { name: true, DoctorData: { select: { id: true } } },
    });
    return { success: "نجح الحصول على بيانات الأطباء لاضافة التقييم", data };
  } catch {
    return { error: "حدث خطأ حين الوصول للأطباء", data: [] };
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const doctor = await db.user.findUnique({
      where: { id, role: "DOCTOR" },
      include: { DoctorData: true },
    });
    if (!doctor)
      return { error: "البيانات الذى أدخلتها غير صحيحه للحصول على الطبيب" };
    return { success: "نجح الحصول على الطبيب", data: doctor };
  } catch {
    return { error: "حدث خطأ أثناء الوصول لبيانات الطبيب" };
  }
};

export const getDoctorByEmail = async (email: string) => {
  try {
    const doctor = await db.user.findUnique({
      where: { email, role: "DOCTOR" },
      include: { DoctorData: true },
    });
    if (!doctor)
      return { error: "البيانات الذى أدخلتها غير صحيحه للحصول على الطبيب" };
    return { success: "نجح الحصول على الطبيب", data: doctor };
  } catch {
    return { error: "حدث خطأ أثناء الوصول لبيانات الطبيب" };
  }
};

export const getUserById = async (id: string) => {
  try {
    const doctor = await db.user.findUnique({
      where: { id, role: "USER" },
      include: { DoctorData: true },
    });
    if (!doctor)
      return { error: "البيانات الذى أدخلتها غير صحيحه للحصول على المستخدم" };
    return { success: "نجح الحصول على المستخدم", data: doctor };
  } catch {
    return { error: "حدث خطأ أثناء الوصول لبيانات المستخدم" };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const doctor = await db.user.findUnique({
      where: { email, role: "USER" },
      include: { DoctorData: true },
    });
    if (!doctor)
      return { error: "البيانات الذى أدخلتها غير صحيحه للحصول على المستخدم" };
    return { success: "نجح الحصول على المستخدم", data: doctor };
  } catch {
    return { error: "حدث خطأ أثناء الوصول لبيانات المستخدم" };
  }
};

export const addDoctor = async (data: AddDoctorSchemaType) => {
  let image, path;
  try {
    data.image = data.image.get("image") as unknown as File;
    const parsedData = addDoctorSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    const user = await db.user.findUnique({
      where: { email: parsedData.data.email },
    });
    if (user) return { error: "الحساب الذى أدخلتة موجود مسبقا" };

    if (typeof parsedData.data.image === "string") {
      image = DEFAULT_IMG;
    } else {
      const file = parsedData.data.image;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image = join(cwd(), "images", `${Date.now()}-${file.name}`);
      await writeFile(image, buffer);
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    await db.user.create({
      data: {
        name:
          parsedData.data.firstName.trim() +
          " " +
          parsedData.data.lastName.trim(),
        email: parsedData.data.email,
        gender: parsedData.data.gender,
        phone: parsedData.data.phone,
        role: "DOCTOR",
        image: image,
        password: hashedPassword,
        DoctorData: {
          create: {
            id: parsedData.data.username,
            article: parsedData.data.article,
            certificate: parsedData.data.certificate,
            country: parsedData.data.country,
            breif: parsedData.data.brief,
            masterId: parsedData.data.master,
            doctorSessions: { create: {} },
            doctorActive: { create: {} },
            money: { create: {} },
          },
        },
      },
    });
    const verificationToken = await generateVerificationToken(data.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "تم ارسال رسالة تأكيد للحساب" };
  } catch (err) {
    if (image !== DEFAULT_IMG && image) {
      await unlink(image);
    }
    return { error: "حدث خطأ أثناء انشاء حساب الطبيب" };
  }
};

export const editDoctor = async (
  email: string,
  lastImage: string,
  data: EditDoctorSchemaType
) => {
  let image, path;
  try {
    data.image = data.image.get("image") as unknown as File;
    const parsedData = editDoctorSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    if (typeof parsedData.data.image === "string") {
      image = parsedData.data.image;
    } else {
      if (DEFAULT_IMG !== lastImage) {
        const prevImage = lastImage;
        await unlink(prevImage);
      }
      const file = parsedData.data.image;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image = join(cwd(), "images", `${Date.now()}-${file.name}`);
      await writeFile(image, buffer);
    }
    await db.user.update({
      where: { email },
      data: {
        name: parsedData.data.name.trim(),
        email: parsedData.data.email,
        gender: parsedData.data.gender,
        phone: parsedData.data.phone,
        role: "DOCTOR",
        image: image,
        DoctorData: {
          update: {
            article: parsedData.data.article,
            certificate: parsedData.data.certificate,
            country: parsedData.data.country,
            breif: parsedData.data.brief,
          },
        },
      },
    });
    return { success: "تم تعديل الحساب بنجاح" };
  } catch (err) {
    console.log(err);
    if (image !== DEFAULT_IMG && image) {
      await unlink(image);
    }
    return { error: "حدث خطأ أثناء تعديل الحساب" };
  }
};

export const editUser = async (
  id: string,
  lastImage: string,
  data: EditUserSchemaType
) => {
  let image;
  try {
    data.image = data.image.get("image") as unknown as File;
    const parsedData = editUserSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    if (typeof parsedData.data.image === "string") {
      image = parsedData.data.image;
    } else {
      // if (DEFAULT_IMG !== lastImage) {
      //   // const prevImage = cwd() + "/public" + lastImage;
      //   await unlink(lastImage);
      // }
      const file = parsedData.data.image;
      const bytes = (await file.arrayBuffer()) as any;
      const buffer = Buffer.from(bytes);
      image = join(cwd(), "images", `${Date.now()}-${file.name}`);
      await writeFile(image, buffer);
    }
    await db.user.update({
      where: { id },
      data: {
        name: parsedData.data.name.trim(),
        email: parsedData.data.email,
        gender: parsedData.data.gender,
        phone: parsedData.data.phone,
        image: image,
      },
    });
    return { success: "تم تعديل حساب المستخدم بنجاح" };
  } catch (err) {
    console.log(err);
    // if (image !== DEFAULT_IMG && image) {
    //   await unlink(image);
    // }
    return { error: "حدث خطأ أثناء تعديل حساب المستخدم" };
  }
};

export const editDoctorDetails = async (
  id: string,
  data: DoctorDetailsSchemaType
) => {
  const parsedData = await doctorDetailsSchema.safeParse(data);
  if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
  try {
    await db.user.update({
      where: { id },
      data: {
        DoctorData: {
          update: {
            doctorRank: parsedData.data.doctorRank,
            doctorDiscount: Number(parsedData.data.doctorDiscount),
          },
        },
      },
    });
    return { success: "تم تعديل بيانات الطبيب بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء تعديل بيانات الطبيب" };
  }
};

export const isDoctorBusy = async (doctorId: string) => {
  try {
    const sessionStart = moment();
    const sessionEnd = sessionStart.clone().add(2.5, "hours");
    const sessions = await db.session.findMany({
      where: {
        date: {
          gte: sessionStart.toDate(),
          lte: sessionEnd.toDate(),
        },
        status: { not: "WAITING_PAY" },
        doctor: { doctor: { id: doctorId } },
      },
    });
    return sessions.length > 0;
  } catch {
    return false;
  }
};

export const isSessionBought = async (doctorId: string, date: Date) => {
  try {
    const session = await db.session.findMany({
      where: {
        doctor: { doctor: { id: doctorId } },
        date: date,
        status: { not: "WAITING_PAY" },
      },
    });
    return session.length > 0;
  } catch (err) {
    return false;
  }
};

export const isHavePackageToBuy = async (
  doctorId: string,
  userId: string,
  type: SessionType
) => {
  try {
    if (!doctorId || !userId || !type) return false;
    const currentDate = moment();
    const packageData = await db.userPackage.findFirst({
      where: {
        status: "PAID",
        doctor: { id: doctorId },
        userId,
        type,
        remain: { gt: 0 },
        validUntil: { gt: currentDate.toDate() },
      },
      select: { id: true, remain: true },
    });

    return Object.keys(packageData!).length !== 0;
  } catch {
    return false;
  }
};

export const buySessionByPackages = async (session: PaymentData) => {
  try {
    if (!session) return { error: "هناك خطأ فى بيانات الجلسة" };

    const packageData = await db.userPackage.findFirst({
      where: {
        status: "PAID",
        doctor: { id: session.doctorId },
        userId: session.userId,
        type: session.sessionType,
        remain: { gt: 0 },
      },
      select: { id: true, remain: true },
    });

    if (!packageData || packageData.remain === 0) {
      return { error: "لا يوجد رصيد فىى البكجات للشراء  بها" };
    }

    const sessionLink = await createWherebyUrl();
    const generateIntent = uuidV4();
    const [sessionData] = await Promise.all([
      db.session.create({
        data: {
          date: session.date!,
          sessionPrice: session.sessionPrice,
          doctorPrice: 0,
          patientPrice: 0,
          doctorId: session.doctorId,
          type: session.sessionType,
          userId: session.userId,
          link: sessionLink.hostRoomUrl,
          coupon: session.coupon,
          status: "RESERVED",
          paymentIntentId: generateIntent,
        },
        select: {
          user: {
            select: {
              name: true,
              image: true,
              id: true,
              email: true,
            },
          },
          doctor: {
            select: {
              doctor: {
                select: {
                  name: true,
                  image: true,
                  id: true,
                  email: true,
                },
              },
            },
          },
        },
      }),

      db.userPackage.update({
        where: { id: packageData.id },
        data: { remain: { decrement: 1 } },
      }),
    ]);
    const [userData, doctorData] = [
      sessionData.user,
      sessionData.doctor.doctor,
    ];

    await createConversation(doctorData.id, userData?.id!);

    let userMessage = "لقد اشتريت من أحد الأطباء",
      doctorMessage = "لقد اشترى أحد العملاء منك";

    doctorMessage = `لقد اشترى منك ${userData!.name} جلسة ${
      session.sessionType === "HALF_HOUR" ? "نصف" : ""
    } ساعة`;

    userMessage = `لقد اشتريت جلسة ${
      session.sessionType === "HOUR" ? "" : "نصف"
    } ساعة`;

    await Promise.all([
      sendSessionNotification({
        data: {
          id: userData!.id,
          name: doctorData.name,
          image: doctorData.image,
        },
        message: userMessage,
      }),
      sendSessionNotification({
        data: {
          id: doctorData!.id,
          name: userData!.name,
          image: userData!.image,
        },
        message: doctorMessage,
      }),
    ]);

    return { success: "تم الشراء بنجاح" };
  } catch (err) {
    console.log(err);
    return { error: "حدث خطأ أثناء الشراء باستخدام البكجات" };
  }
};
