import DashSidebar from "@/components/dashboard/DashSidebar";
import DashHeader from "@/components/dashboard/DashHeader";
import DashFooter from "@/components/dashboard/DashFooter";
import React from "react";

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
        text: "Main page",
      },
      {
        id: 2,
        link: "sessions",
        text: "Sessions",
      },
      {
        id: 3,
        link: "profile",
        text: "Profile",
      },
      {
        id: 4,
        link: "coupons",
        text: "Coupons",
      },
    ],
  },
];

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <div className="content">
        <div className="feature fx-between gap-2">
          <DashSidebar links={sidebarLinks[0].links} />
          <DashHeader />
        </div>
      </div>
      {children}
      <DashFooter />
    </>
  );
}
