"use server";

import { db } from "@/lib/db";
import { RequestMoneySchemaType, requestMoneySchema } from "@/schemas/money";

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
