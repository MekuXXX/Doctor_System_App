import DashSidebar from "@/components/dashboard/DashSidebar";
import DashHeader from "@/components/dashboard/DashHeader";
import React from "react";
import { auth } from "@/auth";
import { SideBarLinkType } from "@/global";
import { redirect } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes";

type Props = {
  children: React.ReactNode;
};

const sidebarLinks: SideBarLinkType = {
  base: ADMIN_DASHBOARD,
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
      link: "coupons",
      text: "الكوبونات",
    },
    {
      id: 4,
      link: "members",
      text: "الأعضاء",
    },
    {
      id: 5,
      link: "details",
      text: "بيانات الأطباء",
    },
    {
      id: 6,
      link: "masters",
      text: "التخصصات",
    },
    {
      id: 7,
      link: "rates",
      text: "التقييمات",
    },
    {
      id: 8,
      link: "requests",
      text: "طلبات السحب",
    },
  ],
};

export default async function DashboardLayout({ children }: Props) {
  const userData = await auth();
  if (!userData || userData.user.role !== "ADMIN") redirect("/");
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
