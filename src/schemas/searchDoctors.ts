import * as z from "zod";

export const searchDoctorsSchema = z.object({
  text: z
    .string({
      invalid_type_error: "نوع البيانات غير صحيح",
    })
    .optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  price: z
    .string()
    // .regex(/^\d+$/, { message: "النوع يجب أن يكون رقم" })
    .optional(),
});

export type SearchDoctorsSchemaType = z.infer<typeof searchDoctorsSchema>;
