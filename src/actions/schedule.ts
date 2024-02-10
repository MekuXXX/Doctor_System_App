"use server";

import { db } from "@/lib/db";
import {
  ScheduleSettingsSchemaType,
  scheduleSettingsSchema,
} from "@/schemas/schedule";
import { DayOfWeek } from "@prisma/client";

export const getDoctorSchedule = async (doctorId: string) => {
  try {
    const data = await db.schedule.findMany({
      where: { doctor: { doctorId } },
      include: { sessions: true },
    });
    return { success: "نجح الحصول على جدول الطبيب", data: data };
  } catch (error) {
    return { error: "حدث خطأ أثناء الحصول على جدول الطبيب" };
  }
};

export const saveDoctorSchedule = async (
  doctorId: string,
  data: ScheduleSettingsSchemaType,
  timezone: string
) => {
  try {
    const parsedData = scheduleSettingsSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    const days = Object.keys(DayOfWeek);

    await Promise.all(
      days.map(async (day) => {
        // Delete existing sessions for the specified day
        await db.schedule.deleteMany({
          where: { doctor: { doctor: { id: doctorId } } },
        });

        // Insert new sessions for the specified day
        await db.user.update({
          where: { id: doctorId },
          data: {
            DoctorData: {
              update: {
                doctorSchedule: {
                  create: {
                    doctorTimeZone: timezone,
                    dayOfWeek: day as DayOfWeek,
                    sessions: {
                      createMany: {
                        data: parsedData.data[day as "FRIDAY"].map(
                          (session) => ({
                            sessionTime: session.sessionTime,
                            sessionPrice: Number(session.sessionPrice),
                            sessionType: session.sessionType,
                          })
                        ),
                      },
                    },
                  },
                },
              },
            },
          },
        });
      })
    );

    return { success: "تم حفظ الجدول بنجاح" };
  } catch (err) {
    console.log(err);
    return { error: "حدث مشكلة أثناء حفظ الجدول" };
  }
};

export const getScheduleSessionsByDay = async (
  doctorId: string,
  day: DayOfWeek
) => {
  try {
    const data = await db.doctorScheduleSession.findMany({
      where: {
        schedule: { dayOfWeek: day, doctor: { id: doctorId } },
      },
    });
    return { success: "نجح الحصول على جلسات الطبيب", data };
  } catch {
    return { error: "حدث خطأ أثناء الحصول على جلسات الطبيب" };
  }
};
