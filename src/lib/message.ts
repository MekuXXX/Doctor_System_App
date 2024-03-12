import { db } from "@/lib/db";

export async function createConversation(doctorId: string, userId: string) {
  try {
    const isConversationExist = await db.user.findFirst({
      where: {
        id: userId,
        conversations: {
          some: {
            users: { some: { id: doctorId } },
          },
        },
      },
    });

    if (!isConversationExist) {
      await db.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: userId,
              },
              {
                id: doctorId,
              },
            ],
          },
        },
      });
    }
    return { success: "تم انشاء الغرفة بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء انشاء الغرفة" };
  }
}
