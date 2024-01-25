import * as z from "zod";

export const addMasterSchema = z.object({
  masterName: z
    .string()
    .refine((n) => n.length > 1, { message: "يجب ادخال هذا الحقل" }),
  description: z.string(),
});

export type AddMasterSchemaType = z.infer<typeof addMasterSchema>;
