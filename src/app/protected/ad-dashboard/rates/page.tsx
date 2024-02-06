import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns } from "./data-table";
import { GoPlus } from "react-icons/go";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { ADMIN_DASHBOARD } from "@/routes";

type Props = {};

const getData = async () => {
  "use server";
  const data = await db.rate.findMany({
    include: { doctor: { select: { doctor: { select: { name: true } } } } },
  });
  return data;
};

export default async function CouponsPage({}: Props) {
  const data = await getData();
  return (
    <div className="content">
      <DataTable
        columns={columns}
        data={data}
        keys={["rates"]}
        queryFn={getData as any}
        searchIn="doctor"
        childrenButtons={
          <div className="ml-2">
            <Link href={`${ADMIN_DASHBOARD}/rates/add-rate`}>
              <Button variant={"outline"} className="flex gap-2">
                <GoPlus className="w-[1.2rem] h-[1.2rem]" />
                <span className="hidden md:block">إضافة تقييم</span>
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
