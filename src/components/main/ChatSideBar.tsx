import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { FaUserFriends } from "react-icons/fa";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { readImage } from "@/actions/images";

type Props = { userId: string };

export default async function ChatSideBar({ userId }: Props) {
  const session = await auth();
  if (!session) redirect("/");
  const conversations = await db.conversation.findMany({
    where: { users: { some: { id: userId } } },
    select: {
      users: {
        where: { id: { not: userId } },
        select: { name: true, image: true },
      },
      id: true,
    },
  });

  for (let i = 0; i < conversations.length; ++i) {
    const image = await readImage(conversations[i].users[0].image);
    conversations[i].users[0].image = image;
  }

  if (session.user.role === "USER") {
    return (
      <div className="flex gap-4 items-center">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <Link
              href={`/chats/${conversation.id}`}
              key={conversation.id}
              className="transition hover:text-main"
            >
              {conversation.users[0].name}
            </Link>
          ))
        ) : (
          <h3 className="p-4">لا يوجد لديك أطباء للتواصل معهم</h3>
        )}
      </div>
    );
  }

  return (
    <Sheet modal>
      <SheetTrigger
        className="absolute -top-4 right-0 focus:ring-2 p-2 rounded-xl hover:bg-accent transition ring-gray-400 flex gap-2 items-center"
        aria-label="قائمة الأصدقاء"
      >
        <FaUserFriends className="w-[1.5rem] h-[1.5rem]" />
        <span className="font-bold text-md hidden md:block">المرضى</span>
      </SheetTrigger>
      <SheetContent>
        <h2 className="text-xl font-extrabold mt-8 text-start">الأطباء</h2>
        <ul className="p-4">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <Link
                href={`/chats/${conversation.id}`}
                key={conversation.id}
                className="flex items-center gap-4 transition hover:bg-accent rounded-3xl"
              >
                <li className="relative rounded-full w-10 h-10 overflow-clip">
                  <Image
                    src={conversation.users[0].image}
                    alt={conversation.users[0].name}
                    fill
                  />
                </li>
                <p>{conversation.users[0].name}</p>
              </Link>
            ))
          ) : (
            <h3 className="p-4">لا يوجد لديك مرضى للتواصل معهم</h3>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
