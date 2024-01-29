"use server";

import { db } from "@/lib/db";
import { AddRateSchemaType } from "@/schemas/rate";
import { Rate } from "@prisma/client";

export const addRate = async (data: AddRateSchemaType) => {
  try {
    await db.rate.create({
      data: {
        patientName: data.patientName,
        doctorId: data.doctorId,
        message: data.message,
        rateValue: Number(data.rate),
      },
    });
    return { success: "تم اضافة التقييم بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء اضافة التقييم" };
  }
};

export const editRate = async (data: Rate) => {
  try {
    const rate = await db.rate.findUnique({ where: { id: data.id } });

    if (!rate) return { error: "خطأ التقييم الذى أدخلته غير موجود" };
    await db.rate.update({ where: { id: data.id }, data });
    return { success: "تم تعديل التقييم بنجاح" };
  } catch {
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
