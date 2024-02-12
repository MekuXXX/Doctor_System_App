import * as z from "zod";

export const addCouponSchema = z
  .object({
    couponType: z.enum(["PERMANENT", "LIMITED"]),
    rangeDate: z
      .object({
        from: z.date({
          required_error: "A start date is required",
        }),
        to: z.date({
          required_error: "A start date is required",
        }),
      })
      .default({
        from: new Date(),
        to: new Date(),
      }),
    discountType: z.enum(["VALUE", "PERCENT"]),
    discountValue: z
      .string()
      .regex(/^\d+$/, { message: "يجب أن يكون المدخل رقم" }),
    useTimes: z.string().regex(/^(?:\d+|unlimited)$/, {
      message: "القيمية الذى أدخلتها غير صحيحه",
    }),
  })
  .refine(
    (data) => {
      if (data.discountType === "PERCENT") {
        return (
          Number(data.discountValue) <= 100 && Number(data.discountValue) > 0
        );
      }
      return true;
    },
    { message: "يجب أن تكون النسبة أكبر من الصفر وأضغر أو تساوى 100" }
  );

export const useCouponSchema = z.object({
  coupon: z.string().length(20, { message: "الكوبون الذى أدخلتة غير صحيح" }),
});

export type UseCouponSchemaType = z.infer<typeof useCouponSchema>;
export type AddCouponSchemaType = z.infer<typeof addCouponSchema>;
