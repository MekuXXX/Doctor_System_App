import * as z from "zod";

export const searchDoctorsSchema = z.object({
  text: z.string(),
});

export type SearchDoctorsSchemaType = z.infer<typeof searchDoctorsSchema>;
