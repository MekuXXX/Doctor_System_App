import DashSidebar from "@/components/dashboard/DashSidebar";
import DashHeader from "@/components/dashboard/DashHeader";
import React from "react";
import { auth } from "@/auth";

type Props = {
  children: React.ReactNode;
};

export type LinkType = {
  id: number;
  link: string;
  text: string;
};

export type SideBarLinkType = {
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  links: LinkType[];
};

const sidebarLinks: SideBarLinkType[] = [
  {
    role: "ADMIN",
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
        link: "doctor-data",
        text: "بيانات الطبيب",
      },
      {
        id: 5,
        link: "profile",
        text: "الملف الشخصى",
      },
      {
        id: 6,
        link: "masters",
        text: "التخصصات",
      },
    ],
  },
];

export default async function DashboardLayout({ children }: Props) {
  const userData = await auth();
  return (
    <div className="bg-[#e5e5e5] dark:bg-[#020817] min-h-screen">
      <div className="content">
        <div className="feature fx-between gap-6">
          <DashSidebar links={sidebarLinks[0].links} />
          <DashHeader user={userData?.user} />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
