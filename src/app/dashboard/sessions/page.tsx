import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { columns } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";
import DataTableSkeleton from "@/components/dashboard/Tables/DataTableSkeleton";

type Props = {};

export default function Sessions({}: Props) {
  return (
    <div className="content">
      <Tabs defaultValue="sessions">
        <div className="w-full flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="reserved">Reserved</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
            <TabsTrigger value="waiting">Waiting</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="sessions">
          <DataTable
            columns={columns}
            data={Array.from("1234567891".repeat(10))}
          />
        </TabsContent>
        <TabsContent value="reserved">Change your password here.</TabsContent>

        <TabsContent value="finished">Change your password here.</TabsContent>

        <TabsContent value="canceled">Change your password here.</TabsContent>
        <TabsContent value="waiting">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
