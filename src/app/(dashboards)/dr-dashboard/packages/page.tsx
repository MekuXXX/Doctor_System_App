import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns } from "./data-table";
import React from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {};

export default async function CouponsPage({}: Props) {
  const session = await auth();
  if (!session) redirect("/");

  const getPackages = async () => {
    "use server";
    const data = await db.userPackage.findMany({
      where: { doctorId: session.user.id, status: { not: "WAITING_PAY" } },
      include: {
        doctor: { select: { doctor: { select: { name: true } } } },
        user: { select: { name: true } },
      },
    });
    return data;
  };
  const data = await getPackages();

  return (
    <div className="content">
      <DataTable
        columns={columns}
        data={data}
        keys={["packages"]}
        queryFn={getPackages as any}
        searchIn="doctor"
      />
    </div>
  );
}
