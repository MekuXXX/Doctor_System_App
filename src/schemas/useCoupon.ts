import * as z from "zod";

export const useCouponSchema = z.object({
  coupon: z.string(),
});

export type UseCouponSchemaType = z.infer<typeof useCouponSchema>;
