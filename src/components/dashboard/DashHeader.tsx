"use client";
import React, { Suspense } from "react";
import {
  DashHeaderTitle,
  DashHeaderTitleFallback,
} from "@/components/dashboard/DashHeaderTitle";
import { UserAvatar } from "@/components/global/UserAvatar";
import { ModeToggle } from "../global/ModeToggle";

type Props = {};

export default function DashHeader({}: Props) {
  return (
    <header className="fx-between grow items-center">
      <Suspense fallback={<DashHeaderTitleFallback />}>
        <DashHeaderTitle />
      </Suspense>
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <p className="hidden md:block">Welcome Mohamed</p>
          <UserAvatar image={"https://placehold.co/600x400.png"} alt="User" />
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
