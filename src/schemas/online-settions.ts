import * as z from "zod";

export const onlineSettingSchema = z.object({
  from: z.string(),
  to: z.string(),
  halfSession: z
    .string()
    .min(1, { message: "يجب ادخال سعر جلسة النصف ساعة" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البيانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),
  hourSession: z
    .string()
    .min(1, { message: "يجب ادخال سعر جلسة ساعة" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البيانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),

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

export type OnlineSettingSchemaType = z.infer<typeof onlineSettingSchema>;
