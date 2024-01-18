import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns } from "./data-table";
import { GoPlus } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

export default function CouponsPage({}: Props) {
  return (
    <div className="content">
      <DataTable
        columns={columns}
        data={Array.from("1234567891".repeat(10))}
        chilrendButtons={
          <div className="ml-2">
            <Button variant={"outline"} className="flex gap-2">
              <GoPlus className="w-[1.2rem] h-[1.2rem]" />
              <Link
                href={"/dashboard/coupons/add-coupon"}
                className="hidden md:block"
              >
                إضافة كوبون
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
