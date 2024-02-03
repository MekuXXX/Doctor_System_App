import AddMaster from "@/components/dashboard/AddMaster";
import { DataTable } from "@/components/dashboard/Tables/DataTable";
import React from "react";
import { columns } from "./data-table";
import { db } from "@/lib/db";

type Props = {};
export const revalidate = 1;

export default async function MastersPage({}: Props) {
  const getData = async () => {
    "use server";
    const data = await db.master.findMany();
    return data;
  };
  const data = await getData();
  return (
    <div className="content">
      <h1>التخصصات</h1>
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <AddMaster />
        <DataTable
          searchIn="name"
          keys={["masters"]}
          queryFn={getData as any}
          data={data}
          columns={columns}
        />
        {/* <ViewMasters /> */}
      </div>
    </div>
  );
}
