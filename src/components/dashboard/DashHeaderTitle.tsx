"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserDataStore } from "@/store/user-data";

type Props = {};
const titles = [
  {
    from: ["ad dashboard", "dr dashboard", "dashboard"],
    to: "الصفحة الرئيسية",
  },
  {
    from: "add doctor",
    to: "اضافة طبيب",
  },
  {
    from: "sessions",
    to: "الحجوزات والطلبات",
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
    from: "edit user",
    to: "تعديل المستخدم",
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
    from: "money",
    to: "الرصيد",
  },
  {
    from: "requests",
    to: "طلبات السحب",
  },
  {
    from: "account",
    to: "حسابك",
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
    if (Array.isArray(lang.from)) {
      for (let childLang of lang.from)
        if (childLang === engTitle) result = lang.to;
    } else if (lang.from === engTitle) result = lang.to;
  }

  return result ? result : engTitle;
};
