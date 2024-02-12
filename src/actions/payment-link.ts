"use server";

import { db } from "@/lib/db";
import {
  AddPaymentLinkSchemaType,
  addPaymentLinkSchema,
} from "@/schemas/payment-link";
import { v4 as uuidV4 } from "uuid";

export const addPaymentLink = async (data: AddPaymentLinkSchemaType) => {
  try {
    const parsedData = addPaymentLinkSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    const token = uuidV4();
    await db.paymentLink.create({
      data: {
        doctorId: parsedData.data.doctor,
        customPrice: Number(parsedData.data.customPrice),
        doctorPrice: Number(parsedData.data.price),
        sessionType: parsedData.data.sessionType,
        date: parsedData.data.date,
        time: parsedData.data.time,
        token,
      },
    });
    return { success: "تم انشاء رابط الدفع بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء انشاء رابط الدفع" };
  }
};

export const removePaymentLink = async (id: string) => {
  try {
    if (!id) return { error: "يجب ادخال رقم رابط الدفع" };
    await db.paymentLink.delete({
      where: { id: id },
    });
    return { success: "تم حذف رابط الدفع بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء حذف رابط الدفع" };
  }
};
