"use server";

import { db } from "@/lib/db";
import {
  ScheduleSettingsSchemaType,
  scheduleSettingsSchema,
} from "@/schemas/schedule";
import { DayOfWeek, DoctorScheduleSession } from "@prisma/client";
import moment from "moment";

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
    return { error: "حدث مشكلة أثناء حفظ الجدول" };
  }
};

export const getScheduleSessionsByDay = async (
  doctorId: string,
  day: DayOfWeek
) => {
  try {
    const currentTime = moment().add(30, "minutes");
    let dayNum = moment().date();

    switch (day.toLowerCase()) {
      case currentTime.format("dddd"):
        break;
      case moment().add(1, "days").format("dddd").toLowerCase():
        dayNum += 1;
        break;
      case moment().add(2, "days").format("dddd").toLowerCase():
        dayNum += 2;
    }

    const data = await db.doctorScheduleSession.findMany({
      where: {
        schedule: { dayOfWeek: day, doctor: { id: doctorId } },
      },
    });

    if (data.length === 0) return { success: "لا توجد جلسات اليوم", data: [] };

    const doctorSessions = await db.session.findMany({
      where: {
        doctor: { id: doctorId, doctor: { role: "DOCTOR" } },
        status: "RESERVED",
      },
    });

    const newData = data.filter((session) => {
      const sessionTime = moment().set({
        hour: parseInt(session.sessionTime.substring(0, 2)), // Extract hour from time string
        minute: parseInt(session.sessionTime.substring(3, 5)), // Extract minute from time string
        second: 0,
        millisecond: 0,
      });
      return currentTime.format("dddd").toUpperCase() !== day
        ? true
        : sessionTime > currentTime;
    });

    let filteredData: DoctorScheduleSession[] = [];

    newData.forEach((session) => {
      let isExist = false;
      let scheduleTime = moment().set({
        date: dayNum,
        hour: parseInt(session.sessionTime.substring(0, 2)), // Extract hour from time string
        minute: parseInt(session.sessionTime.substring(3, 5)), // Extract minute from time string
        second: 0,
        millisecond: 0,
      });
      // console.log(`Schedule time`, scheduleTime);
      doctorSessions.forEach((doctorSession) => {
        const sessionTime = moment(doctorSession.date);
        // console.log(sessionTime);
        if (sessionTime.format() === scheduleTime.format()) {
          console.log("Hitted");
          isExist = true;
        }
      });

      if (!isExist) filteredData.push(session);
    });

    filteredData.sort((a, b) => {
      const firstSessionTime = moment().set({
        hour: parseInt(a.sessionTime.substring(0, 2)), // Extract hour from time string
        minute: parseInt(a.sessionTime.substring(3, 5)), // Extract minute from time string
        second: 0,

        millisecond: 0,
      });

      const secondSessionTime = moment().set({
        hour: parseInt(b.sessionTime.substring(0, 2)), // Extract hour from time string
        minute: parseInt(b.sessionTime.substring(3, 5)), // Extract minute from time string
        second: 0,

        millisecond: 0,
      });

      return firstSessionTime < secondSessionTime ? -1 : 1;
    });

    return { success: "نجح الحصول على جلسات الطبيب", data: filteredData };
  } catch {
    return { error: "حدث خطأ أثناء الحصول على جلسات الطبيب" };
  }
};
