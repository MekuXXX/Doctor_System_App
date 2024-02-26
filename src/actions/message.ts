"use server";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { messageArrayValidator } from "@/schemas/message";

export async function getConversation(chatId: string) {
  try {
    const room = await db.conversation.findUnique({
      where: { id: chatId },
      include: {
        users: true,
        messages: { take: 50, orderBy: { createdAt: "desc" } },
      },
    });

    return { success: "تم الحصول على الغرفة بنجاح", data: room };
  } catch (error) {
    return { error: "حدث خطأ أثناء الحصول على الغرفة" };
  }
}

export async function getChatMessages(chatId: string) {
  try {
    const messages = await db.message.findMany({
      where: { conversationId: chatId },
    });
    const validatedMessages = messageArrayValidator.parse(messages);

    return { success: "تم الحصول على الرسائل بنجاح", data: validatedMessages };
  } catch (error) {
    return { error: "حدث خطأ أثناء الحصول على الرسائل" };
  }
}

export async function sendChatMessage(
  chatId: string,
  body: string,
  senderId: string
) {
  try {
    const message = await db.message.create({
      data: {
        conversationId: chatId,
        body,
        senderId,
      },
    });

    await pusherServer.trigger(`chat_${chatId}`, "incoming-message", message);
    console.log("Hitted");
    return { success: "نجح ارسال الرسالة" };
  } catch (err) {
    console.log(err);
    return { error: "حدث خطأ أثناء ارسال الرسالة" };
  }
}
