"use client";
import { useUserData } from "@/hooks/use-user-data";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

export default function ChangeTimezone({ className }: Props) {
  const { data, isLoading, isError } = useUserData();

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;
  return (
    <p className={cn("text-sm", className)}>
      المواقيت تظهر حسب توقيت ( {data?.geoplugin_timezone} ){" "}
      <span className="text-main">تغيير</span>
    </p>
  );
}
