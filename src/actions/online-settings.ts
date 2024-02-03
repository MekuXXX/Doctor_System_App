"use server";
import { db } from "@/lib/db";
import {
  OnlineSettingSchemaType,
  onlineSettingSchema,
} from "@/schemas/online-settions";

export const saveOnlineSettings = async (
  email: string,
  isOnline: boolean,
  data: OnlineSettingSchemaType
) => {
  try {
    const parsedData = await onlineSettingSchema.safeParse(data);
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
                halfSessions: Number(parsedData.data.halfSession),
                hourSessions: Number(parsedData.data.hourSession),
              },
            },
            doctorActive: {
              update: {
                from: parsedData.data.from,
                to: parsedData.data.to,
                isActive: isOnline,
              },
            },
          },
        },
      },
    });
    return { success: "تم حفط الاعدادات بنجاح" };
  } catch (err) {
    console.log(err);
    return { error: "حدث خطأ أثناء حفظ الاعدادات" };
  }
};
