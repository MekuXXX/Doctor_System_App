"use server";

import { db } from "@/lib/db";
import { SessionStatus } from "@prisma/client";

export const changeSessionStatus = async (
  sessionId: string,
  status: SessionStatus
) => {
  try {
    await db.session.update({ where: { id: sessionId }, data: { status } });
    return { success: "تم تحديث الجلسة بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء تحديث الجلسة" };
  }
};

export const deleteSessions = async (sessionsId: string[]) => {
  try {
    await Promise.all(
      sessionsId.map((sessionId) =>
        db.session.delete({ where: { id: sessionId } })
      )
    );

    return { success: "تم حذف الجلسات بنجاح" };
  } catch {
    return { error: "حدثت مشكلة أثناء حذف الجلسات" };
  }
};

export const changeSessionDate = async (
  sessionId: string,
  sessionDate: Date
) => {
  try {
    await db.session.update({
      where: { id: sessionId },
      data: { date: sessionDate },
    });
    return { success: "تم تحديث الجلسة بنجاح" };
  } catch {
    return { error: "حدثت مشكلة أثناء تغير وقت الجلسة" };
  }
};
