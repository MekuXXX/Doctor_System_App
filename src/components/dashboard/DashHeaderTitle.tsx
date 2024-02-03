"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserDataStore } from "@/store/user-data";

type Props = {};
const titles = [
  {
    from: "sessions",
    to: "الحجوزات والطلبات",
  },
  {
    from: "dashboard",
    to: "الصفحة الرئيسية",
  },
  {
    from: "masters",
    to: "التخصصات",
  },
  {
    from: "coupons",
    to: "الكوبونات",
  },
  {
    from: "add coupon",
    to: "اضافة كوبون",
  },
  {
    from: "members",
    to: "الأعضاء",
  },
  {
    from: "edit doctor",
    to: "تعديل الطبيب",
  },
  {
    from: "rates",
    to: "التقييمات",
  },
  {
    from: "add rate",
    to: "اضافة تقييمات",
  },
  {
    from: "details",
    to: "بيانات الأطباء",
  },
  {
    from: "online settings",
    to: "اعدادات الأونلاين",
  },
  {
    from: "dr dashboard",
    to: "الصفحة الرئيسية",
  },
  {
    from: "money",
    to: "الرصيد",
  },
  {
    from: "requests",
    to: "طلبات السحب",
  },
];

export type TitlesType = typeof titles;

export function DashHeaderTitle({}: Props) {
  const path = usePathname().split("/").slice(1);
  const { userData } = useUserDataStore();
  let pageHeader = path[path.length - 1];
  if (pageHeader.includes("-")) pageHeader = pageHeader.split("-").join(" ");

  pageHeader = getArTitle(titles, pageHeader);

  return (
    <div className="md:flex items-center gap-4">
      <h1 className="capitalize font-medium text-2xl">{pageHeader}</h1>
      <p className="hidden md:block">({userData?.geoplugin_timezone})</p>
    </div>
  );
}

export function DashHeaderTitleFallback() {
  return <Skeleton className="w-32 h-6" />;
}

const getArTitle = (titles: TitlesType, engTitle: string) => {
  let result;
  for (let lang of titles) {
    if (lang.from === engTitle) result = lang.to;
  }

  return result ? result : engTitle;
};
