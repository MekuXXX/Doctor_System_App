import { AllSessionsTable } from "@/components/dashboard/Tables/AllSessions/AllSessions";
import { Payment, columns } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {};
const data: Payment[] = [
  {
    id: "1",
    amount: 31,
    status: "processing",
    email: "test1@example.com",
  },

  {
    id: "2",
    amount: 32,
    status: "success",
    email: "test2@example.com",
  },

  {
    id: "3",
    amount: 33,
    status: "failed",
    email: "test3@example.com",
  },

  {
    id: "4",
    amount: 34,
    status: "pending",
    email: "test4@example.com",
  },

  {
    id: "5",
    amount: 35,
    status: "processing",
    email: "test5@example.com",
  },

  {
    id: "6",
    amount: 36,
    status: "processing",
    email: "test6@example.com",
  },
  {
    id: "7",
    amount: 37,
    status: "success",
    email: "test7@example.com",
  },

  {
    id: "8",
    amount: 38,
    status: "failed",
    email: "test8@example.com",
  },

  {
    id: "9",
    amount: 39,
    status: "pending",
    email: "test9@example.com",
  },

  {
    id: "10",
    amount: 40,
    status: "pending",
    email: "test10@example.com",
  },

  {
    id: "11",
    amount: 41,
    status: "pending",
    email: "test11@example.com",
  },
  {
    id: "12",
    amount: 42,
    status: "pending",
    email: "test12@example.com",
  },

  {
    id: "13",
    amount: 43,
    status: "pending",
    email: "test13@example.com",
  },

  {
    id: "1",
    amount: 31,
    status: "processing",
    email: "test1@example.com",
  },

  {
    id: "2",
    amount: 32,
    status: "success",
    email: "test2@example.com",
  },

  {
    id: "3",
    amount: 33,
    status: "failed",
    email: "test3@example.com",
  },

  {
    id: "4",
    amount: 34,
    status: "pending",
    email: "test4@example.com",
  },

  {
    id: "5",
    amount: 35,
    status: "processing",
    email: "test5@example.com",
  },

  {
    id: "6",
    amount: 36,
    status: "processing",
    email: "test6@example.com",
  },
  {
    id: "7",
    amount: 37,
    status: "success",
    email: "test7@example.com",
  },

  {
    id: "8",
    amount: 38,
    status: "failed",
    email: "test8@example.com",
  },

  {
    id: "9",
    amount: 39,
    status: "pending",
    email: "test9@example.com",
  },

  {
    id: "10",
    amount: 40,
    status: "pending",
    email: "test10@example.com",
  },
];

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
          <AllSessionsTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent value="reserved">Change your password here.</TabsContent>

        <TabsContent value="finished">Change your password here.</TabsContent>

        <TabsContent value="canceled">Change your password here.</TabsContent>
        <TabsContent value="waiting">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
