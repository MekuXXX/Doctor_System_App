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
  return (
    <header dir="rtl" className="content">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" />
        </Link>
        <nav className="fixed bottom-0 left-0 py-4 px-12 w-full md:w-fit md:relative bg-white z-10 dark:bg-dark md:bg-transparent">
          <ul className="flex justify-between items-center gap-4">
            {pages.map(({ id, link, text, icon }) => (
              <li key={id}>
                <Link
                  href={link}
                  className="flex items-center gap-4 flex-col hover:text-main transition"
                >
                  {icon}
                  <span>{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-2 items-center grid-cols-2">
          <MainButton>احجز الان</MainButton>
          {user ? (
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex gap-2 text-main hover:text-white hover:bg-main"
                  variant={"outline"}
                >
                  <span>{user.user?.name}</span>
                  <IoMdArrowDropdown />
                </Button>
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
