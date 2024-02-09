"use server";
import { db } from "@/lib/db";
import {
  PackagesSettingsSchemaType,
  packagesSettingsSchema,
} from "@/schemas/doctor-packages";

export const saveDoctorPackages = async (
  email: string,
  data: PackagesSettingsSchemaType
) => {
  try {
    const parsedData = await packagesSettingsSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    const user = await db.user.findUnique({ where: { email, role: "DOCTOR" } });
    if (!user) return { error: "حساب الطبيب المدخل غير موجود" };
    if (user.role !== "DOCTOR")
      return { error: "الحساب الذى تستعملة ليس حساب طبيب" };
    await db.user.update({
      where: { email },
      data: {
        role: "DOCTOR",
        DoctorData: {
          update: {
            doctorSessions: {
              update: {
                twoSessions: Number(parsedData.data.twoSessions),
                fourSessions: Number(parsedData.data.fourSessions),
              },
            },
          },
        },
      },
    });
    return { success: "تم حفط الاعدادات بنجاح" };
  } catch (err) {
    return { error: "حدث خطأ أثناء حفظ الاعدادات" };
  }
};
