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
import Logo from "#/logo1.png";
import Image from "next/image";

type Props = {
  links: LinkType[];
};

export default function DashSidebar({ links }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu aria-label="القائمة الجانبية" size={25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-4">
            <Image src={Logo} alt="Logo" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-y-2 py-6">
          {links.map(({ id, link, text }) => (
            <Button key={id} variant={"ghost"} className="justify-start">
              <Link
                href={`/dashboard/${link}`}
                className="capitalize block w-full text-right"
              >
                {text}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
