import { auth } from "@/auth";
import DashDoctorOnlineSettings from "@/components/dashboard/DashDoctorOnlineSettings";
import { DashDoctorPackages } from "@/components/dashboard/DoctorPackages";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function PackagesPage({}: Props) {
  const user = await auth();
  if (!user) notFound();
  const getData = async () => {
    "use server";
    try {
      const data = await db.user.findUnique({
        where: { email: user?.user.email!, role: "DOCTOR" },
        select: {
          DoctorData: {
            select: {
              doctorSessions: true,
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
      <DashDoctorPackages
        user={data as any}
        getData={getData}
        email={user?.user.email!}
      />
    </div>
  );
}
