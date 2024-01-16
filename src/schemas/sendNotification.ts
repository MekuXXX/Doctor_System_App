import * as z from "zod";

export const sendEmNotificationSchema = z.object({
  type: z.enum(["all", "person"], {
    invalid_type_error: "هذا النوع غير صحيح",
    required_error: "يجب ادخال هذا الحقل",
  }),
  personEmail: z.string().email({ message: "يجب ادخال الايميل" }).optional(),
  message: z.string().min(1, { message: "يجب ادخال الرساله" }),
});

export const sendAllNotificationSchema = z.object({
  type: z.enum(["all", "person"], {
    invalid_type_error: "هذا النوع غير صحيح",
    required_error: "يجب ادخال هذا الحقل",
  }),
  personEmail: z.string().email({ message: "يجب ادخال الايميل" }).optional(),
  message: z.string().min(1, { message: "يجب ادخال الرساله" }),
});

export type SendEmNotificationSchemaType = z.infer<
  typeof sendEmNotificationSchema
>;

export type SendAllNotificationSchemaType = z.infer<
  typeof sendAllNotificationSchema
>;
