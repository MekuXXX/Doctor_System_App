import ScheduleSettings from "@/components/dashboard/ScheduleSettings";
import React from "react";

type Props = {};

export default function SchedulePage({}: Props) {
  return (
    <div className="content">
      <ScheduleSettings />
    </div>
  );
}
