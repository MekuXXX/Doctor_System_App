import { auth } from "@/auth";
import ChatSideBar from "@/components/main/ChatSideBar";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function ChatLayout({ children }: Props) {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="content relative">
      <ChatSideBar userId={session.user.id!} />
      <div className=" flex-grow">{children}</div>
    </div>
  );
}
