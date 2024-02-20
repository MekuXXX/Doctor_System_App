"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getNotificationDate } from "@/lib/moment";
import { pusherServer } from "@/lib/pusher";
import {
  SendNotificationSchemaType,
  sendNotificationSchema,
} from "@/schemas/sendNotification";
import { redirect } from "next/navigation";

export const getUserNotifications = async (id: string) => {
  try {
    if (!id) return { error: "يجب ادخال رمز المستخدم" };
    const notifications = await db.notification.findMany({
      where: { userId: id },
      take: 10,
      orderBy: { date: "desc" },
    });
    return { success: "نجح الحصول على الاشعارات", data: notifications };
  } catch {
    return { error: "حدث خطأ أثناء الحصول على اشعارات المستخدم" };
  }
};

export const sendAdminNotification = async (
  data: SendNotificationSchemaType
) => {
  try {
    const admin = await auth();
    if (!admin || admin.user.role !== "ADMIN") redirect("/");
    if (data.personEmail === admin.user.email)
      return { error: "لا يمكن ارسال الرساله لنفس الحساب" };

    const parsedData = sendNotificationSchema.safeParse(data);
    if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };
    const notification = {
      image: admin.user.image!,
      message: parsedData.data.message,
      name: admin.user.name!,
      date: getNotificationDate(),
    };

    if (parsedData.data.type === "person") {
      const user = await db.user.findUnique({
        where: { email: parsedData.data.personEmail },
      });
      if (!user) return { error: "الحساب الذى أدخلتة غير موجود" };
      pusherServer.trigger(
        "notifications",
        `new-notification:${user.id}`,
        notification
      );
      await db.user.update({
        where: { id: user.id },
        data: {
          notifications: { create: notification },
          newNotifications: user.newNotifications + 1,
        },
      });
    } else {
      pusherServer.trigger("notifications", "new-notification", notification);

      const usersId = await db.user.findMany({
        where: { role: { not: "ADMIN" } },
        select: { id: true, newNotifications: true },
      });

      await Promise.all(
        usersId.map((user) =>
          db.user.update({
            where: { id: user.id },
            data: {
              notifications: { create: notification },
              newNotifications: user.newNotifications + 1,
            },
          })
        )
      );
    }

    return { success: "نجح ارسال الاشعار بنجاح" };
  } catch {
    return { error: "خطأ أثناء ارسال الاشعار" };
  }
};

export const removeNewNotificationsNumber = async (userId: string) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: { newNotifications: 0 },
    });
  } catch {
    return { error: "خطأ أثناء تحديث الاشعارات الجديده" };
  }
};
