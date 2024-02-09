import * as z from "zod";

export const sendNotificationSchema = z.object({
  type: z.enum(["all", "person"], {
    invalid_type_error: "هذا النوع غير صحيح",
    required_error: "يجب ادخال هذا الحقل",
  }),
  personEmail: z.string().email({ message: "يجب ادخال الايميل" }).optional(),
  message: z.string().min(1, { message: "يجب ادخال الرساله" }),
});

export type SendNotificationSchemaType = z.infer<typeof sendNotificationSchema>;
