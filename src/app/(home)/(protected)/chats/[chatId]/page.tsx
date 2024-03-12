import { getConversation } from "@/actions/message";
import { auth } from "@/auth";
import ChatInput from "@/components/main/ChatInput";
import Messages from "@/components/main/Messages";
import Image from "next/image";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const { chatId } = params;
  const conversation = await getConversation(chatId);
  if (conversation.error || conversation.data === null) redirect("/");
  const { user } = session;

  const otherUser = conversation.data?.users.find(
    (convUser) => convUser.id !== user.id
  );

  return (
    <div className="h-full px-2 flex justify-between flex-col min-h-[75]">
      <div className="flex items-center gap-4 py-3 border-b-2 border-gray-200">
        <div className="relative w-12 h-12 rounded-full">
          <Image
            fill
            referrerPolicy="no-referrer"
            src={otherUser?.image!}
            alt={`${otherUser?.name} profile picture`}
            className="rounded-full"
          />
        </div>
        <p>{otherUser?.name}</p>
      </div>

      <Messages
        chatId={chatId}
        chatPartner={otherUser!}
        sessionImg={session.user.image}
        sessionId={session.user.id!}
        initialMessages={conversation.data?.messages!}
      />
      <ChatInput chatId={chatId} sessionId={user.id!} />
    </div>
  );
};

export default page;
