"use server";
import { db } from "@/lib/db";
import { v4 as uuidV4 } from "uuid";
import { addCouponSchema, AddCouponSchemaType } from "@/schemas/addCoupon";

export const addCoupon = async (data: AddCouponSchemaType) => {
  try {
    const parsedVal = addCouponSchema.safeParse(data);
    if (!parsedVal.success) return { error: "البيانات الذى أدخلتها غير صيححه" };
    let coupon = uuidV4().slice(0, 20);

    const couponDb = await db.coupon.findUnique({ where: { coupon } });
    if (couponDb)
      return { error: "خطأ أثناء انشاء الكوبون برجاء اعادة المحاولة" };

    await db.coupon.create({
      data: {
        type: parsedVal.data.couponType,
        discountType: parsedVal.data.discountType,
        discountValue: Number(parsedVal.data.discountValue),
        useTimes: parsedVal.data.useTimes,
        from: parsedVal.data.rangeDate.from,
        to: parsedVal.data.rangeDate.to,
        coupon,
      },
    });
    return { success: "تم انشاء الكوبون بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء انشاء الكوبون" };
  }
};

export const addDoctorCoupon = async (
  doctorEmail: string,
  data: AddCouponSchemaType
) => {
  try {
    const parsedVal = addCouponSchema.safeParse(data);
    if (!parsedVal.success) return { error: "البيانات الذى أدخلتها غير صيححه" };
    let coupon = uuidV4().slice(0, 20);

    const couponDb = await db.coupon.findUnique({ where: { coupon } });
    if (couponDb)
      return { error: "خطأ أثناء انشاء الكوبون برجاء اعادة المحاولة" };

    await db.user.update({
      where: { email: doctorEmail },
      data: {
        DoctorData: {
          update: {
            coupons: {
              create: {
                type: parsedVal.data.couponType,
                discountType: parsedVal.data.discountType,
                discountValue: Number(parsedVal.data.discountValue),
                useTimes: parsedVal.data.useTimes,
                from: parsedVal.data.rangeDate.from,
                to: parsedVal.data.rangeDate.to,
                coupon,
              },
            },
          },
        },
      },
    });
    return { success: "تم انشاء الكوبون بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء انشاء الكوبون" };
  }
};

export const removeCoupon = async (id: string) => {
  try {
    await db.coupon.delete({ where: { id } });
    return { success: "تم حذف الكوبون بنجاح" };
  } catch {
    return { error: "خطأ أثناء حذف الكوبون" };
  }
};
