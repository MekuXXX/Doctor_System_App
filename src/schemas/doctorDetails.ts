import { DoctorRank } from "@prisma/client";
import * as z from "zod";

export const doctorRanks = Array.from(Object.keys(DoctorRank));

export const doctorDetailsSchema = z.object({
  doctorRank: z.enum(doctorRanks as any),
  doctorDiscount: z.string().refine((n) => Number(n) >= 0 && Number(n) <= 100, {
    message: "الرقم يجب أن يكون أكبر من 0 وأصغر من 100",
  }),
});

export type DoctorDetailsSchemaType = z.infer<typeof doctorDetailsSchema>;
