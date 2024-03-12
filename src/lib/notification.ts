import { db } from "@/lib/db";
import { getNotificationDate } from "@/lib/moment";
import { pusherServer } from "@/lib/pusher";

export type NotificationUserType = {
  id: string;
  name: string;
  image: string;
};

export type Notification = {
  data: NotificationUserType;
  message: string;
};

export const sendSessionNotification = async (user: Notification) => {
  try {
    const { data, message } = user;

    const user_notification = {
      name: data.name,
      date: getNotificationDate(),
      image: data.image,
      message: message,
    };

    pusherServer.trigger(
      "notifications",
      `new-notification:${data.id}`,
      user_notification
    );

    await db.user.update({
      where: { id: data.id },
      data: {
        newNotifications: { increment: 1 },
        notifications: {
          create: user_notification,
        },
      },
    });

    return { success: "تم ارسال الاشعار بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء ارسال الاشعار" };
  }
};
