import * as z from "zod";

export const packagesSettingsSchema = z.object({
  twoSessions: z
    .string()

    .min(1, { message: "يجب ادخال سعر الجلستين" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البييانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),

  fourSessions: z
    .string()

    .min(1, { message: "يجب ادخال سعر الأربع جلسات" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البييانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),
});

export type PackagesSettingsSchemaType = z.infer<typeof packagesSettingsSchema>;
