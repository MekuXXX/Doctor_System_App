import React from "react";
import Image from "next/image";
import Logo from "#/logo1.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { BsFillBagPlusFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import MainButton from "@/components/global/MainButton";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "@/components/auth/login-button";
import { ADMIN_DASHBOARD, DOCTOR_DASHBOARD, USER_DASHBOARD } from "@/routes";
import { getUserNotifications } from "@/actions/notifications";
import { db } from "@/lib/db";
import { Notifications } from "@/components/global/Notifications";
import { ModeToggle } from "@/components/global/ModeToggle";
import { FullScreenToggle } from "@/components/global/FullScreenToggle";
import MainSearch from "@/components/main/MainSearch";
import ChatButton from "@/components/global/ChatButton";

type Props = {};

const pages = [
  {
    id: 1,
    link: "/",
    text: "الصفحهة الرئسيية",
    icon: <IoHome className="w-[1.75rem] h-[1.75rem] md:hidden" />,
  },

  {
    id: 2,
    link: "/doctors",
    text: "الأخصائيين",
    icon: <BsFillBagPlusFill className="w-[1.75rem] h-[1.75rem] md:hidden" />,
  },
  {
    id: 3,
    link: "https://virtualpsy.org/blog-psy",
    text: "المجلة",
    icon: <GrArticle className="w-[1.75rem] h-[1.75rem] md:hidden" />,
  },
];

export default async function Header({}: Props) {
  const user = await auth();
  const dashboard =
    user?.user.role === "USER"
      ? USER_DASHBOARD
      : user?.user.role === "ADMIN"
      ? ADMIN_DASHBOARD
      : DOCTOR_DASHBOARD;
  let notifications, newNotifications;
  if (user) {
    notifications = await getUserNotifications(user.user.id!);
    newNotifications = await db.user.findUnique({
      where: { id: user.user.id },
      select: { newNotifications: true },
    });
  }

  return (
    <header dir="rtl" className="content">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link href={"/"} className="block">
            <Image src={Logo} alt="Logo" />
          </Link>
          <nav className="w-full md:w-fit fixed bottom-0 left-0 md:relative bg-white z-10 dark:bg-dark md:bg-transparent">
            <ul className="flex justify-around items-center gap-4">
              {pages.map(({ id, link, text, icon }) => (
                <li key={id}>
                  <Link
                    href={link}
                    className="flex items-center gap-4 flex-col hover:text-main transition text-nowrap"
                  >
                    {icon}
                    <span>{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <MainSearch />
          <ModeToggle />
          <FullScreenToggle />
          {user ? (
            <>
              <ChatButton />
              <Notifications
                initialData={notifications?.data!}
                userId={user.user.id!}
                newNotifications={newNotifications?.newNotifications!}
                role={user.user.role!}
              />
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <MainButton className="flex gap-2">
                    <span>{user.user?.name}</span>
                    <IoMdArrowDropdown />
                  </MainButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel dir="rtl">إعدادات</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={dashboard}>حسابى</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogoutButton>تسجيل الخروج</LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <MainButton>
              <LoginButton>تسجيل الدخول</LoginButton>
            </MainButton>
          )}
        </div>
      </div>
    </header>
  );
}
