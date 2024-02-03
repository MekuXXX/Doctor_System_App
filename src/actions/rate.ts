"use server";

import { db } from "@/lib/db";
import { AddRateSchemaType, addRateSchema } from "@/schemas/rate";
import { Rate } from "@prisma/client";

export const getRatesDoctors = async () => {
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

export const addRate = async (data: AddRateSchemaType) => {
  const parsedData = addRateSchema.safeParse(data);

  if (!parsedData.success) return { error: "البيانات الذى أدخلتها غير صحيحة" };
  try {
    await db.doctorData.update({
      where: { id: parsedData.data.doctorId },
      data: {
        Rate: {
          create: {
            message: parsedData.data.message,
            patientName: parsedData.data.patientName,
            rateValue: Number(parsedData.data.rate),
          },
        },
      },
    });
    return { success: "تم اضافة التقييم بنجاح" };
  } catch (err) {
    return { error: "حدث خطأ أثناء اضافة التقييم" };
  }
};

export const editRate = async (data: Rate) => {
  try {
    const rate = await db.rate.findUnique({ where: { id: data.id } });
    if (!rate) return { error: "خطأ التقييم الذى أدخلته غير موجود" };
    await db.rate.update({ where: { id: data.id }, data });
    return { success: "تم تعديل التقييم بنجاح" };
  } catch (err) {
    return { error: "حدث خطأ أثنا تعديل التقييم" };
  }
};

export const removeRate = async (id: string) => {
  try {
    await db.rate.delete({ where: { id } });
    return { success: "تم حذف التقييم بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء حذف التقييم" };
  }
};
