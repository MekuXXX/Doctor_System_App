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
  const data = await db.paymentLink.findMany();
  return data;
};

export default async function CouponsPage({}: Props) {
  const data = await getData();

  return (
    <div className="content">
      <DataTable
        columns={columns}
        data={data}
        keys={["payment", "links"]}
        queryFn={getData as any}
        searchIn="coupon"
        childrenButtons={
          <div className="ml-2">
            <Link href={`${ADMIN_DASHBOARD}/payment-links/add-link`}>
              <Button variant={"outline"} className="flex gap-2">
                <GoPlus className="w-[1.2rem] h-[1.2rem]" />
                <span className="hidden md:block">إضافة رابط</span>
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
