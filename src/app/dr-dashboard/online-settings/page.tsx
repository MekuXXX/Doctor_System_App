import { logout } from "@/actions/logout";
import { auth } from "@/auth";
import DashDoctorOnlineSettings from "@/components/dashboard/DashDoctorOnlineSettings";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function OnlineSettingsPage({}: Props) {
  const user = await auth();
  const getData = async () => {
    "use server";
    try {
      const data = await db.user.findUnique({
        where: { email: user?.user.email!, role: "DOCTOR" },
        select: {
          email: true,
          DoctorData: {
            select: {
              doctorSessions: true,
              doctorActive: true,
            },
          },
        },
      });
      return data;
    } catch {
      return [];
    }
  };
  const data = await getData();
  if (!data) redirect("/");

  return (
    <div className="content">
      <DashDoctorOnlineSettings user={data as any} getData={getData} />
    </div>
  );
}
