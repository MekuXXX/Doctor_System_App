import { DataTable } from "@/components/dashboard/Tables/DataTable";
import React from "react";
import { columns } from "./data-table";
import { db } from "@/lib/db";
import { calculateRate } from "@/lib/rate";
import { readImage } from "@/actions/images";

type Props = {};
export const revalidate = 1;

export default async function DetailsPage({}: Props) {
  const getData = async () => {
    "use server";
    const doctors = await db.user.findMany({
      where: { role: "DOCTOR" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        DoctorData: {
          select: {
            country: true,
            doctorRank: true,
            doctorDiscount: true,
            master: { select: { name: true } },
            Rate: { select: { rateValue: true } },
            money: { select: { pending: true, ready: true } },
            doctorSessions: {
              select: { halfSessions: true, hourSessions: true },
            },
          },
        },
      },
    });
    const newData: typeof doctors = [];
    for (const doctor of doctors) {
      const image = await readImage(doctor.image);
      doctor.image = image;
      newData.push(doctor);
    }
    return newData;
  };
  const data = await getData();
  return (
    <div className="content">
      <DataTable
        searchIn="name"
        keys={["doctors", "details"]}
        queryFn={getData as any}
        data={data}
        columns={columns}
      />
    </div>
  );
}
