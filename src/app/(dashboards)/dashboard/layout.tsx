import DashSidebar from "@/components/dashboard/DashSidebar";
import DashHeader from "@/components/dashboard/DashHeader";
import React from "react";
import { auth } from "@/auth";
import { SideBarLinkType } from "@/global";
import { redirect } from "next/navigation";
import { USER_DASHBOARD } from "@/routes";

type Props = {
  children: React.ReactNode;
};

const sidebarLinks: SideBarLinkType = {
  base: USER_DASHBOARD,
  links: [
    {
      id: 1,
      link: "",
      text: "الصفحة الرئيسية",
    },
    {
      id: 2,
      link: "sessions",
      text: "الطلبات والحجوزات",
    },
    {
      id: 3,
      link: "packages",
      text: "البكجات",
    },
    {
      id: 4,
      link: "account",
      text: "حسابك",
    },
  ],
};

export default async function DashboardLayout({ children }: Props) {
  const userData = await auth();
  if (!userData || userData.user.role !== "USER") redirect("/");

  return (
    <div className="bg-[#e5e5e5] dark:bg-[#020817] min-h-screen">
      <div className="content">
        <div className="feature fx-between gap-6">
          <DashSidebar routes={sidebarLinks} />
          <DashHeader />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
