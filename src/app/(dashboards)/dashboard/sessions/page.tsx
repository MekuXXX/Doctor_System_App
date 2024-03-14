import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns as reservedColumns } from "./new-data-table";
import { columns as oldColumns } from "./old-data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { db } from "@/lib/db";

const getOldSessions = async () => {
  "use server";
  const data = await db.session.findMany({
    where: {
      status: { notIn: ["WAITING_PAY", "RESERVED"] },
    },
    include: {
      user: { select: { name: true } },
      doctor: { select: { doctor: { select: { name: true } } } },
    },
  });
  return data;
};

const getReservedSessions = async () => {
  "use server";
  const data = await db.session.findMany({
    where: { status: "RESERVED" },
    include: {
      user: { select: { name: true } },
      doctor: { select: { doctor: { select: { name: true } } } },
    },
  });
  return data;
};

type Props = {};

export default async function Sessions({}: Props) {
  const oldSessions = await getOldSessions();
  const reservedData = await getReservedSessions();

  return (
    <div className="content">
      <Tabs defaultValue="new" dir="rtl">
        <div className="w-full flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="new">القادمة</TabsTrigger>
            <TabsTrigger value="old">السابقة</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="new">
          <DataTable
            columns={reservedColumns}
            data={reservedData}
            keys={["session", "new"]}
            queryFn={getReservedSessions as any}
            searchIn="user.name"
          />
        </TabsContent>
        <TabsContent value="old">
          <DataTable
            columns={oldColumns}
            data={oldSessions}
            keys={["session", "old"]}
            queryFn={getOldSessions as any}
            searchIn="user.name"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
