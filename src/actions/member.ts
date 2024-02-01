"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { unlink } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

export const getMembers = async (role?: UserRole) => {
  try {
    let data;
    if (role === "USER") {
      data = await db.user.findMany({ where: { role: "USER" } });
    } else if (role === "DOCTOR") {
      data = await db.user.findMany({
        where: { role: "DOCTOR" },
        include: {
          DoctorData: {
            select: { id: true },
          },
        },
      });
      data.forEach((doctor) => {
        if ("DoctorData" in doctor) {
          doctor.DoctorData = doctor.DoctorData?.id as unknown as {
            id: string;
          } | null;
        }
      });
    } else if (role === "ADMIN") {
      data = await db.user.findMany({ where: { role: "ADMIN" } });
    } else {
      data = await db.user.findMany({ where: { role: { not: "ADMIN" } } });
    }

    return { success: "تم الحصول على الأعضاء بنجاح", data };
  } catch {
    return { error: "خطأ أثناء الحصول على الأعضاء" };
  }
};

export const removeMember = async (id: string) => {
  try {
    const res = await db.user.delete({ where: { id } });
    if (res.image !== "/images/default.jpg")
      unlink(join(cwd(), "public", res.image as string));
    return { success: "تم الحذف بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء الحذف" };
  }
};
