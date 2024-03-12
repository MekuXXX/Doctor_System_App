import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns as allColumns } from "./all-data-table";
import { columns as finishedColumns } from "./finished-data-table";
import { columns as cancelledColumns } from "./cancelled-data-table";
import { columns as reservedColumns } from "./reserved-data-table";
import { columns as waitingColumns } from "./wait-data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {};

export default async function Sessions({}: Props) {
  const session = await auth();
  if (!session) redirect("/");
  const getAllSessions = async () => {
    "use server";
    const data = await db.session.findMany({
      where: {
        status: { not: "WAITING_PAY" },
        doctor: { doctor: { id: session.user.id } },
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
      where: {
        status: "RESERVED",

        doctor: { doctor: { id: session.user.id } },
      },
      include: {
        user: { select: { name: true } },
        doctor: { select: { doctor: { select: { name: true } } } },
      },
    });
    return data;
  };

  const getWaitingSessions = async () => {
    "use server";
    const data = await db.session.findMany({
      where: {
        status: "WAITING",

        doctor: { doctor: { id: session.user.id } },
      },
      include: {
        user: { select: { name: true } },
        doctor: { select: { doctor: { select: { name: true } } } },
      },
    });
    return data;
  };

  const getCancelledSessions = async () => {
    "use server";
    const data = await db.session.findMany({
      where: {
        OR: [{ status: "CANCELLED" }, { status: "CANCELLED_DONE" }],

        doctor: { doctor: { id: session.user.id } },
      },
      include: {
        user: { select: { name: true } },
        doctor: { select: { doctor: { select: { name: true } } } },
      },
    });
    return data;
  };

  const getFinishedSessions = async () => {
    "use server";
    const data = await db.session.findMany({
      where: {
        status: "DONE",

        doctor: { doctor: { id: session.user.id } },
      },
      include: {
        user: { select: { name: true } },
        doctor: { select: { doctor: { select: { name: true } } } },
      },
    });
    return data;
  };
  const allSessions = await getAllSessions();
  const reservedData = await getReservedSessions();
  const cancelledData = await getCancelledSessions();
  const finishedData = await getFinishedSessions();
  const waitingData = await getWaitingSessions();

  return (
    <div className="content">
      <Tabs defaultValue="sessions" dir="rtl">
        <div className="w-full flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="sessions">الجلسات</TabsTrigger>
            <TabsTrigger value="reserved">المحجوزة</TabsTrigger>
            <TabsTrigger value="waiting">الانتظار</TabsTrigger>
            <TabsTrigger value="canceled">الملغية</TabsTrigger>
            <TabsTrigger value="finished">المنتهية</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="sessions">
          <DataTable
            columns={allColumns}
            data={allSessions}
            keys={["session", "all"]}
            queryFn={getAllSessions as any}
            searchIn="user.name"
          />
        </TabsContent>
        <TabsContent value="reserved">
          <DataTable
            columns={reservedColumns}
            data={reservedData}
            keys={["session", "reserved"]}
            queryFn={getReservedSessions as any}
            searchIn="user.name"
          />
        </TabsContent>
        <TabsContent value="waiting">
          <DataTable
            columns={waitingColumns}
            data={waitingData}
            keys={["session", "waiting"]}
            queryFn={getWaitingSessions as any}
            searchIn="user.name"
          />
        </TabsContent>

        <TabsContent value="canceled">
          <DataTable
            columns={cancelledColumns}
            data={cancelledData}
            keys={["session", "cancelled"]}
            queryFn={getCancelledSessions as any}
            searchIn="user.name"
          />
        </TabsContent>
        <TabsContent value="finished">
          <DataTable
            columns={finishedColumns}
            data={finishedData}
            keys={["session", "finished"]}
            queryFn={getFinishedSessions as any}
            searchIn="user.name"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
