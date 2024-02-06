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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "#/logo1.png";
import Image from "next/image";
import { SideBarLinkType } from "@/global";

type Props = {
  routes: SideBarLinkType;
};

export default function DashSidebar({ routes }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu aria-label="القائمة الجانبية" size={25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-4">
            <Link href={"/"}>
              <Image src={Logo} alt="Logo" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-y-2 py-6">
          {routes.links.map(({ id, link, text }) => (
            <Button key={id} variant={"ghost"} className="justify-start">
              <Link
                href={`${routes.base}/${link}`}
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
