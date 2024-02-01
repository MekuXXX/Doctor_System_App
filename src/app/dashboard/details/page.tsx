import AddMaster from "@/components/dashboard/AddMaster";
import { DataTable } from "@/components/dashboard/Tables/DataTable";
import React from "react";
import { columns } from "./data-table";
import { db } from "@/lib/db";

type Props = {};
export const revalidate = 1;

export default async function DetailsPage({}: Props) {
  const getData = async () => {
    "use server";
    const data = await db.master.findMany();
    return data;
  };
  const data = await getData();
  return (
    <div className="content">
      <h1>الأطباء</h1>
      <DataTable
        searchIn="name"
        keys={["masters"]}
        queryFn={getData as any}
        data={data}
        columns={columns}
      />
    </div>
  );
}
