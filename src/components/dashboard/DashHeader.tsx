import React, { Suspense } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import {
  DashHeaderTitle,
  DashHeaderTitleFallback,
} from "@/components/dashboard/DashHeaderTitle";
import { ModeToggle } from "@/components/global/ModeToggle";
import { FullScreenToggle } from "@/components/global/FullScreenToggle";
import { Button } from "@/components/ui/button";
import { Notifications } from "@/components/global/Notifications";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {};

export default async function DashHeader({}: Props) {
  const user = await auth();
  if (!user) redirect("/");

  return (
    <header className="fx-between grow items-center py-2">
      <div className="flex gap-4 items-center">
        <Suspense fallback={<DashHeaderTitleFallback />}>
          <DashHeaderTitle />
        </Suspense>
        {/* {status && <p className=" text-sm">{userData?.geoplugin_timezone}</p>} */}
      </div>
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
            <div className="hidden md:block">
              <p className="text-[0.75rem] text-[#ed0b4c] tracking-wider">
                {user?.user.name}
              </p>
              <p className="text-[0.5rem] -mt-1 uppercase tracking-wide">
                {user?.user.role}
              </p>
            </div>
            <div className=" w-8 h-8 rounded-sm relative overflow-clip">
              <Image
                src={user?.user.image!}
                alt={user?.user.name!}
                fill
                sizes="3rem"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
