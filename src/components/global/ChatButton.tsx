import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoChatbubbles } from "react-icons/io5";

type Props = {};

export default function ChatButton({}: Props) {
  return (
    <Link href={"/chats"}>
      <Button variant={"outline"} className="w-fit p-2" aria-label="الرسائل">
        <IoChatbubbles className=" w-[1.25rem] h-[1.25rem]" />
      </Button>
    </Link>
  );
}
