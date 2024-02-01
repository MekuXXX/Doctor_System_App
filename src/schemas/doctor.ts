import * as z from "zod";
export const MAX_IMAGE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const addDoctorSchema = z.object({
  username: z.string().min(1, { message: "يجب ادخال اسم اللطيف" }),
  firstName: z.string().min(1, { message: "يجب ادخال الاسم الأول" }),
  lastName: z.string().min(1, { message: "يجب ادخالل الاسم الثاانى" }),
  email: z.string().email({ message: "يجب ادخال حساب الطبيب" }),
  image: z
    .string()
    .refine((n) => n === "/images/default.jpg")
    .or(
      z
        .any()
        .refine((file) => {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, "الصورة يجب أن تكون من نوع (jpeg, jpg, png, webp)")
        .refine((file) => {
          return file?.size <= MAX_IMAGE_SIZE;
        }, `أقصى حد للصوره هو 2 ميغا`)
    ),
  brief: z.string().min(1, { message: "يجب ادخال نبذه مختتصره عن الطببيب" }),
  certificate: z
    .string()
    .min(1, { message: "يجب اضافة شهادات الطبيب العلمية" }),
  master: z.string().min(1, { message: "يجب ادخال تخصص الطبيب" }),
  article: z.string(),
  phone: z.string().min(1, { message: "يجب ادخال هذا الحقل" }),
  country: z.string().min(1, { message: "يجب اختيار بلد الطبيب" }),
  gender: z.enum(["male", "female"]),
  password: z.string().min(6, { message: "يجب ادخال كلمة مرور الطبييب" }),
});

export const editDoctorSchema = z.object({
  name: z.string().min(1, { message: "يجب ادخال اسم الطبيب" }),
  email: z.string().email({ message: "يجب ادخال حساب الطبيب" }),
  image: z
    .string()
    .refine((n) => n.includes("/images"))
    .or(
      z
        .any()
        .refine((file) => {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, "الصورة يجب أن تكون من نوع (jpeg, jpg, png, webp)")
        .refine((file) => {
          return file?.size <= MAX_IMAGE_SIZE;
        }, `أقصى حد للصوره هو 2 ميغا`)
    ),
  brief: z.string().min(1, { message: "يجب ادخال نبذه مختتصره عن الطببيب" }),
  certificate: z
    .string()
    .min(1, { message: "يجب اضافة شهادات الطبيب العلمية" }),
  master: z.string().min(1, { message: "يجب ادخال تخصص الطبيب" }),
  article: z.string(),
  phone: z.string().min(1, { message: "يجب ادخال هذا الحقل" }),
  country: z.string().min(1, { message: "يجب اختيار بلد الطبيب" }),
  gender: z.enum(["male", "female"]),
});

export type AddDoctorSchemaType = z.infer<typeof addDoctorSchema>;
export type EditDoctorSchemaType = z.infer<typeof editDoctorSchema>;
