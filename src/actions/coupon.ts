"use server";
import { db } from "@/lib/db";
import { v4 as uuidV4 } from "uuid";
import { addCouponSchema, AddCouponSchemaType } from "@/schemas/coupon";
import moment from "moment";

export const addCoupon = async (data: AddCouponSchemaType) => {
  try {
    const parsedVal = addCouponSchema.safeParse(data);
    if (!parsedVal.success) return { error: "البيانات الذى أدخلتها غير صيححه" };
    let coupon = uuidV4().slice(0, 8);

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
    let coupon = uuidV4().slice(0, 8);

    const couponDb = await db.coupon.findUnique({ where: { coupon } });
    if (couponDb)
      return { error: "خطأ أثناء انشاء الكوبون برجاء اعادة المحاولة" };

    await db.user.update({
      where: { email: doctorEmail, role: "DOCTOR" },
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

export const checkCoupon = async (
  coupon: string,
  price: number,
  doctorId: string
) => {
  try {
    if (typeof coupon !== "string" || coupon.length !== 20)
      return { error: "الكوبون غير صحيح" };
    const couponData = await db.coupon.findUnique({ where: { coupon } });
    if (!couponData) return { error: "الكوبون الذى أدخلتة غير موجود" };

    if (couponData.doctorId && doctorId !== couponData.doctorId)
      return { error: "الكوبون الذى أدخلتة غير خاص بهذا الطبيب" };

    if (couponData.type === "LIMITED") {
      const currentDate = moment();
      const from = moment(couponData.from);
      const to = moment(couponData.to);

      if (!currentDate.isBetween(from, to))
        return { error: "صلاحية الكوبون انتهت" };
    }

    if (couponData.useTimes !== "unlimited") {
      if (couponData.usage >= Number(couponData.useTimes))
        return { error: "انهت مرات استخدام الكوبون" };
      await db.coupon.update({
        where: { id: couponData.id },
        data: { usage: couponData.usage + 1 },
      });
    }

    let resultData = {} as { discount: number; coupon: string };
    if (couponData.discountType === "VALUE") {
      resultData.discount = couponData.discountValue;
    } else {
      const percent = couponData.discountValue / 100;
      resultData.discount = price * percent;
    }
    resultData.coupon = couponData.coupon;
    return { success: "الكوبون الذى أدخلته صالح للاستخدام", data: resultData };
  } catch {
    return { error: "حدثت مشكلة أثناء التحقق من الكوبون" };
  }
};

export const isCouponExist = async (coupon: string) => {
  try {
    if (coupon.length !== 20 || typeof coupon !== "string") return false;
    const dbCoupon = await db.coupon.findUnique({ where: { coupon } });
    if (!dbCoupon) return false;
    return true;
  } catch {
    return false;
  }
};
