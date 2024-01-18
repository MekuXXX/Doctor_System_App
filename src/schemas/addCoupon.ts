import * as z from "zod";

export const FormRangedSchema = z.object({
  couponType: z.enum(["permanent", "limited"]),
  rangeDate: z
    .object({
      from: z
        .date({
          required_error: "A start date is required",
        })
        .default(new Date()),
      to: z.date({
        required_error: "A start date is required",
      }),
    })
    .optional(),
  discountType: z.enum(["value", "percent"]),
  discountValue: z
    .string()
    .regex(/^\d+$/, "Type must be a number")
    .transform(Number)
    .refine((n) => n > 0 && n < 100)
    .or(z.number().min(0).max(100)),
  useTimes: z
    .string()
    .regex(/^\d+$/, "Type must be a number")
    .transform(Number)
    .refine((n) => n > 0)
    .or(z.number().min(1)),
});

export const FormUnlimitedSchema = FormRangedSchema.omit({ rangeDate: true });

export type FormRangedSchemaType = z.infer<typeof FormRangedSchema>;
export type FormUnlimitedSchemaType = z.infer<typeof FormUnlimitedSchema>;
