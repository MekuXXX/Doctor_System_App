import { DataTable } from "@/components/dashboard/Tables/DataTable";
import React from "react";
import { columns } from "./data-table";
import { db } from "@/lib/db";
import { calculateRate } from "@/lib/rate";

type Props = {};
export const revalidate = 1;

export default async function DetailsPage({}: Props) {
  const getData = async () => {
    "use server";
    const data = await db.user.findMany({
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
    return data.map((doctor) => {
      const { halfSessions, hourSessions } = doctor.DoctorData?.doctorSessions!;
      return {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        country: doctor.DoctorData?.country,
        "Doctor Rank": doctor.DoctorData?.doctorRank,
        "Doctor Discount": doctor.DoctorData?.doctorDiscount,
        image: doctor.image,
        master: doctor.DoctorData?.master?.name,
        rate: calculateRate(doctor.DoctorData?.Rate!),
        moneyPending: doctor.DoctorData?.money?.pending,
        moneyReady: doctor.DoctorData?.money?.ready,
        minSession: hourSessions < halfSessions ? hourSessions : halfSessions,
      };
    });
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
