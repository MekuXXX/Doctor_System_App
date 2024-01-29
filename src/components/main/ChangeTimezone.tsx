"use client";
import { cn } from "@/lib/utils";
import { useUserDataStore } from "@/store/user-data";
import React from "react";

type Props = {
  className?: string;
};

export default function ChangeTimezone({ className }: Props) {
  const { userData } = useUserDataStore();

  return (
    <p className={cn("text-sm", className)}>
      المواقيت تظهر حسب توقيت ( {userData?.geoplugin_timezone} ){" "}
      <span className="text-main">تغيير</span>
    </p>
  );
}
