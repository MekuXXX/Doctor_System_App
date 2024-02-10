import * as z from "zod";

export const dayScheduleSchema = z.object({
  sessionType: z.enum(["half", "hour"]),
  sessionTime: z
    .string()
    .regex(/\d\d:\d\d/, { message: "يجب أن يكون الوقت على هذا الشكل HH:MM" }),
  sessionPrice: z
    .string()
    .min(1, { message: "يجب ادخال سعر جلسة ساعة" })
    .refine((n) => !isNaN(Number(n)), {
      message: "خطأ فى نوع البيانات المدخلة",
    })
    .refine((n) => Number(n) > 0, {
      message: "الرقم المدخلة يجب أن يكون أكبر من الصفر",
    }),
});

export const scheduleSettingsSchema = z.object({
  MONDAY: z.array(dayScheduleSchema),
  TUESDAY: z.array(dayScheduleSchema),
  WEDNESDAY: z.array(dayScheduleSchema),
  THURSDAY: z.array(dayScheduleSchema),
  FRIDAY: z.array(dayScheduleSchema),
  SATURDAY: z.array(dayScheduleSchema),
  SUNDAY: z.array(dayScheduleSchema),
});

export type ScheduleSettingsSchemaType = z.infer<typeof scheduleSettingsSchema>;
export type DayScheduleSchemaType = z.infer<typeof dayScheduleSchema>;
