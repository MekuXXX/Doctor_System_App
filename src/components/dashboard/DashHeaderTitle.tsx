"use clint";
import { usePathname } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
];

export type TitlesType = typeof titles;

export function DashHeaderTitle({}: Props) {
  const path = usePathname().split("/").slice(1);
  let pageHeader = path[path.length - 1];
  if (pageHeader.includes("-")) pageHeader = pageHeader.split("-").join(" ");

  pageHeader = getArTitle(titles, pageHeader);

  return <h1 className="capitalize font-medium text-2xl">{pageHeader}</h1>;
}

export function DashHeaderTitleFallback() {
  return <Skeleton className="w-32 h-6" />;
}

const getArTitle = (titles: TitlesType, enTitle: string) => {
  let result;
  for (let lang of titles) {
    if (lang.from === enTitle) result = lang.to;
  }

  return result ? result : enTitle;
};
