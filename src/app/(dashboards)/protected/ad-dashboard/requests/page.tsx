import { DataTable } from "@/components/dashboard/Tables/DataTable";
import React from "react";
import { db } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns as newColumns } from "./data-table-new";
import { columns as prevColumns } from "./data-table-prev";
import { auth } from "@/auth";

type Props = {};

const getNewRequests = async () => {
  "use server";
  const data = await db.moneyRequest.findMany({
    where: { status: "WAITING" },
    select: {
      id: true,
      date: true,
      money: true,
      doctor: { select: { doctor: { select: { name: true } } } },
    },
  });
  return data;
};

const getPrevRequests = async () => {
  "use server";
  const data = await db.moneyRequest.findMany({
    where: { status: { not: "WAITING" } },
    select: {
      id: true,
      date: true,
      money: true,
      status: true,
      doctor: { select: { doctor: { select: { name: true } } } },
    },
  });
  return data;
};
export default async function CouponsPage({}: Props) {
  const newData = await getNewRequests();
  const prevData = await getPrevRequests();

  return (
    <div className="content">
      <Tabs defaultValue="new" dir="rtl">
        <div className="w-full flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="new">طلبات جديدة</TabsTrigger>
            <TabsTrigger value="prev">طلبات سابقة</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="new">
          <DataTable
            columns={newColumns}
            data={newData}
            keys={["requests", "new"]}
            queryFn={getNewRequests as any}
            searchIn="name"
          />
        </TabsContent>
        <TabsContent value="prev">
          <DataTable
            columns={prevColumns}
            data={prevData}
            keys={["requests", "prev"]}
            queryFn={getPrevRequests as any}
            searchIn="name"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
