import React, { use } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { DashHeaderTitle } from "@/components/dashboard/DashHeaderTitle";
import { ModeToggle } from "@/components/global/ModeToggle";
import { FullScreenToggle } from "@/components/global/FullScreenToggle";
import { Button } from "@/components/ui/button";
import { Notifications } from "@/components/global/Notifications";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserNotifications } from "@/actions/notifications";
import { db } from "@/lib/db";
import ChatButton from "@/components/global/ChatButton";

type Props = {};

export default async function DashHeader({}: Props) {
  const user = await auth();
  if (!user) redirect("/");
  const notifications = await getUserNotifications(user.user.id!);
  const newNotifications = await db.user.findUnique({
    where: { id: user.user.id },
    select: { newNotifications: true },
  });
  // TODO: add notification error
  if (notifications.error) return <h1>خطأ فى الاشعارات</h1>;

  return (
    <header className="fx-between grow items-center py-2">
      <div className="flex gap-4 items-center">
        <DashHeaderTitle />
        {/* {status && <p className=" text-sm">{userData?.geoplugin_timezone}</p>} */}
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center justify-center">
          <div>
            <ModeToggle />
          </div>
          <ChatButton />
          <div>
            <FullScreenToggle />
          </div>
          <div>
            <Notifications
              initialData={notifications.data!}
              userId={user.user.id!}
              newNotifications={newNotifications?.newNotifications!}
              role={user.user.role!}
            />
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
              <p className="text-[0.75rem] text-[#ed0b4c] tracking-wider select-none">
                {user?.user.name}
              </p>
              <p className="text-[0.5rem] -mt-1 uppercase tracking-wide select-none">
                {user?.user.role}
              </p>
            </div>
            <div className=" w-8 h-8 rounded-sm relative overflow-clip select-none">
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
