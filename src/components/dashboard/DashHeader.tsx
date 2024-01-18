"use client";
import React, { Suspense, useEffect, useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import {
  DashHeaderTitle,
  DashHeaderTitleFallback,
} from "@/components/dashboard/DashHeaderTitle";
import { UserAvatar } from "@/components/global/UserAvatar";
import { ModeToggle } from "@/components/global/ModeToggle";
import { FullScreenToggle } from "@/components/global/FullScreenToggle";
import { Button } from "@/components/ui/button";
import { Notifications } from "@/components/global/Notifications";

type Props = {};

export default function DashHeader({}: Props) {
  return (
    <header className="fx-between grow items-center py-2">
      <Suspense fallback={<DashHeaderTitleFallback />}>
        <DashHeaderTitle />
      </Suspense>
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center justify-center">
          <div>
            <ModeToggle />
          </div>
          <div>
            <FullScreenToggle />
          </div>
          <div>
            <Notifications />
          </div>
          <div>
            <Button
              className="w-9 h-9 p-0"
              variant={"outline"}
              aria-label="الأعضاء"
            >
              <PiDotsNineBold className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[0.875rem] text-[#ed0b4c] tracking-wider">
                David Morse
              </p>
              <p className="text-[0.625rem] -mt-1 uppercase tracking-wide">
                Admin
              </p>
            </div>
            <UserAvatar
              image={
                "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=996&t=st=1705394298~exp=1705394898~hmac=9ce3ba43a58db9b7ed678affed056dbd07f822028e6ff19c84ffb0ec1ec37e26"
              }
              alt="User"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
