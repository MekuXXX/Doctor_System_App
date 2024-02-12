import * as z from "zod";

export const addPaymentLinkSchema = z.object({
  doctor: z.string().min(1, { message: "يجب ادخال الطبيب" }),
  date: z.date(),
  time: z.string().regex(/\d\d:\d\d/g, {
    message: "يجب أن يكون الوقت على الشكل التالى HH:MM",
  }),
  price: z
    .string()
    .min(1, { message: "يجب ادخال سعر الجلسة" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البيانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),
  customPrice: z
    .string()
    .min(1, { message: "يجب ادخال السعر المخصص" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البيانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),
  sessionType: z.enum(["HALF_HOUR", "HOUR"]),
});

export type AddPaymentLinkSchemaType = z.infer<typeof addPaymentLinkSchema>;
