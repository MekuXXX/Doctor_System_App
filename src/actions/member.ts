"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getMembers = async (role?: UserRole) => {
  try {
    let data;
    if (role === "USER") {
      data = await db.user.findMany({ where: { role: "USER" } });
    } else if (role === "DOCTOR") {
      data = await db.user.findMany({ where: { role: "DOCTOR" } });
    } else if (role === "ADMIN") {
      data = await db.user.findMany({ where: { role: "ADMIN" } });
    } else {
      data = await db.user.findMany();
    }

    return { success: "تم الحصول على الأعضاء بنجاح", data };
  } catch {
    return { error: "خطأ أثناء الحصول على الأعضاء" };
  }
};
