"use server";
import { db } from "@/lib/db";
import {
  AddDoctorSchemaType,
  EditDoctorSchemaType,
  addDoctorSchema,
  editDoctorSchema,
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
import { error } from "console";

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
      image = "/images/default.jpg";
    } else {
      const file = parsedData.data.image;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image = join("/images/", `${Date.now()}-${file.name}`);
      path = join(cwd(), "public", image);
      await writeFile(path, buffer);
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
    if (image !== "/images/default.jpg" && path) {
      await unlink(path);
    }
    return { error: "حدث خطأ أثناء انشاء حساب الطبيب" };
  }
};

export const editDoctor = async (
  id: string,
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
      const prevImage = cwd() + "/public" + lastImage;
      console.log(prevImage);
      await unlink(prevImage);
      const file = parsedData.data.image;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      image = join("/images/", `${Date.now()}-${file.name}`);
      path = join(cwd(), "public", image);
      await writeFile(path, buffer);
    }
    await db.user.update({
      where: { id },
      data: {
        name: data.name.trim(),
        email: parsedData.data.email,
        gender: parsedData.data.gender,
        phone: parsedData.data.phone,
        role: "DOCTOR",
        image: image,
        emailVerified: new Date(),
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
    return { success: "تم تعديل حساب الطبيب بنجاح" };
  } catch {
    if (image !== "/images/default.jpg" && path) {
      await unlink(path);
    }
    return { error: "حدث خطأ أثناء تعديل حساب الطبيب" };
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
