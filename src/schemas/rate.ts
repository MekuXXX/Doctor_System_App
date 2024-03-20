import * as z from "zod";

export const addRateSchema = z.object({
  patientName: z.string().optional(),
  userId: z.string().optional(),
  doctorId: z
    .string({
      required_error: "يجب ادخال اسم الطبيب",
    })
    .min(1, { message: "يجب ادخال اسم المريض" }),
  rate: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "يجب اختيار تقييم الطبيب",
  }),
  message: z
    .string({
      required_error: "يجب ادخال رساله التقييم",
    })
    .min(1, { message: "يجب ادخال رساله التقييم" }),
});

export type AddRateSchemaType = z.infer<typeof addRateSchema>;
