import * as z from "zod";

export const requestMoneySchema = z.object({
  money: z.string().refine((n) => !isNaN(Number(n)), {
    message: "يجب أن يكون البيانات المدخلة أرقام",
  }),
});

export type RequestMoneySchemaType = z.infer<typeof requestMoneySchema>;
