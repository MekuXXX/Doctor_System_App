import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns } from "./data-table";
import { GoPlus } from "react-icons/go";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";

type Props = {};

const getData = async () => {
  "use server";
  const data = await db.coupon.findMany();
  const refinedData = data.map((curr) => {
    let discount;
    if (curr.discountType === "PERCENT") {
      discount = curr.discountValue + "%";
    } else {
      discount = curr.discountValue + "$";
    }
    return {
      coupon: curr.coupon,
      type:
        curr.type === "PERMANENT"
          ? "دائم"
          : curr.from?.getTime() + " " + curr.to?.getDate(),
      useTimes: curr.useTimes === "unlimited" ? "غير محدود" : curr.useTimes,
      id: curr.id,
      discount,
    };
  }, []);
  return refinedData;
};

export default async function CouponsPage({}: Props) {
  const data = await getData();

  return (
    <div className="content">
      <DataTable
        columns={columns}
        data={data}
        keys={["coupons"]}
        queryFn={getData as any}
        searchIn="coupon"
        chilrendButtons={
          <div className="ml-2">
            <Link href={"/dashboard/coupons/add-coupon"}>
              <Button variant={"outline"} className="flex gap-2">
                <GoPlus className="w-[1.2rem] h-[1.2rem]" />
                <span className="hidden md:block">إضافة كوبون</span>
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
