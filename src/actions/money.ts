"use server";

import { db } from "@/lib/db";
import { RequestMoneySchemaType, requestMoneySchema } from "@/schemas/money";
import { Money_Request_Status } from "@prisma/client";

export const deleteDoctorMoney = async (doctorId: string, money: number) => {
  try {
    const doctorMoney = await db.doctorMoney.findUnique({
      where: { doctorId },
    });

    if (doctorMoney?.pending! < money) {
      return { error: "المال ليس فى حساب الطبيب" };
    }

    await db.doctorMoney.update({
      where: { doctorId },
      data: { pending: { decrement: money } },
    });
    return { success: "نجح حذف المال من الطبيب" };
  } catch (error) {
    return { error: "حدث خطأ أثناء تحديث أموال الطبيب" };
  }
};

export const changeMoneyToReady = async (doctorId: string, money: number) => {
  try {
    const doctorMoney = await db.doctorMoney.findUnique({
      where: { doctorId },
    });

    if (doctorMoney?.pending! < money) {
      return { error: "المال ليس فى حساب الطبيب" };
    }

    await db.doctorMoney.update({
      where: { doctorId },
      data: { ready: { increment: money } },
    });
    return { success: "نجح تحويل المال للطبيب" };
  } catch (error) {
    return { error: "حدث خطأ أثناء تحديث أموال الطبيب" };
  }
};

export const deleteMoneyFromPending = async (
  doctorId: string,
  money: number
) => {
  try {
    const doctorMoney = await db.doctorMoney.findUnique({
      where: { doctorId },
    });

    if (doctorMoney?.pending! < money) {
      return { error: "المال ليس فى حساب الطبيب" };
    }

    await db.doctorMoney.update({
      where: { doctorId },
      data: { pending: { decrement: money } },
    });
    return { success: "نجح تحويل المال للطبيب" };
  } catch (error) {
    return { error: "حدث خطأ أثناء تحديث أموال الطبيب" };
  }
};

export const getDoctorMoney = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email, role: "DOCTOR" },
      select: { DoctorData: { select: { money: true } } },
    });
    if (!user) return { error: "الحساب الذى أدخلتة غير صحيح" };
    return {
      success: "تم الحصول على بيانات الطبيب بنجاح",
      data: user.DoctorData?.money,
    };
  } catch {
    return { error: "حدث خطأ أثناء الحصول بيانات الطبيب " };
  }
};

export const makeMoneyRequest = async (
  email: string,
  data: RequestMoneySchemaType
) => {
  try {
    const parsedData = requestMoneySchema.safeParse(data);
    if (!parsedData.success)
      return { error: "البيانات الذى أدخلتها غير صحيحه" };
    const money = Number(parsedData.data.money);
    const doctor = await db.user.findUnique({
      where: { email, role: "DOCTOR" },
      select: {
        id: true,
        DoctorData: {
          select: {
            money: true,
          },
        },
      },
    });

    if (!doctor) return { error: "الحساب المستخدم غير موجود" };

    if (money > doctor.DoctorData?.money?.ready!)
      return { error: "الأموال المطلوبه غير موجودة بالحساب" };

    await db.user.update({
      where: { id: doctor.id, email, role: "DOCTOR" },
      data: {
        DoctorData: {
          update: {
            money: {
              update: {
                ready: doctor.DoctorData?.money?.ready! - money,
              },
            },
            moneyRequests: {
              create: {
                money: money,
                date: new Date(),
              },
            },
          },
        },
      },
    });
    return { success: "تم ارسال طلب السحب بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء ارسال طلب السحب" };
  }
};

export const getDoctorRequests = async (email: string) => {
  try {
    const doctor = await db.user.findUnique({
      where: { email, role: "DOCTOR" },
      select: {
        DoctorData: {
          select: { id: true },
        },
      },
    });
    if (!doctor) return { error: "الحساب المستخدم غير صحيح" };
    const data = await db.moneyRequest.findMany({
      where: { doctorId: doctor.DoctorData?.id },
    });

    return { success: "نجح الحصول على بيانات طلبات سحب الطبيب", data };
  } catch {
    return { error: "حدث خطأ أثناء الحسول على بيانات طلبات السحب", data: [] };
  }
};

export const updateMoneyRequest = async (
  id: string,
  status: Money_Request_Status
) => {
  try {
    const req = await db.moneyRequest.update({
      where: { id },
      data: { status },
    });
    if (status === "CANCELLED") {
      await db.doctorMoney.update({
        where: { doctorId: req.doctorId },
        data: { pending: { increment: req.money } },
      });
    }
    return { success: "تم تحديث الطلب بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء تحديث الطلب" };
  }
};
