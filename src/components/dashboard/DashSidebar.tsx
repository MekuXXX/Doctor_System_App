import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { LinkType, SideBarLinkType } from "@/app/dashboard/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  links: LinkType[];
};

export default function DashSidebar({ links }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu size={25} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Logo</SheetTitle>
          <SheetDescription>Courtry</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-y-2 py-6">
          {links.map(({ id, link, text }) => (
            <Button key={id} variant={"ghost"} className="justify-start">
              <Link href={`/dashboard/${link}`} className="capitalize">
                {text}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
