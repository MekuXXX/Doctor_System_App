import DashSidebar from "@/components/dashboard/DashSidebar";
import DashHeader from "@/components/dashboard/DashHeader";
import React from "react";
import { auth } from "@/auth";
import { SideBarLinkType } from "@/global";

type Props = {
  children: React.ReactNode;
};

const sidebarLinks: SideBarLinkType = {
  base: "dr-dashboard",
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
      link: "money",
      text: "الرصيد",
    },
    {
      id: 5,
      link: "online-settings",
      text: "اعدادات الأونلاين",
    },
  ],
};

export default async function DashboardLayout({ children }: Props) {
  const userData = await auth();
  return (
    <div className="bg-[#e5e5e5] dark:bg-[#020817] min-h-screen">
      <div className="content">
        <div className="feature fx-between gap-6">
          <DashSidebar routes={sidebarLinks} />
          <DashHeader user={userData?.user} />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
