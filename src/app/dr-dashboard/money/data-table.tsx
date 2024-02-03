"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/global/DataTableColumnHeader";
import { DataTableItem } from "@/components/global/DataTableItem";
import { cn } from "@/lib/utils";
import React from "react";
import { StatusBadge } from "@/components/main/StatusBadge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "#",
    header: ({}) => (
      <DataTableColumnHeader className=" text-black dark:text-white font-bolder text-lg">
        #
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <DataTableItem className="text-black dark:text-white">
        {String(row.index + 1).padStart(2, "00")}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "money",
    header: ({}) => <DataTableColumnHeader>المال</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.original.money}$</DataTableItem>,
  },
  {
    accessorKey: "date",
    header: () => <DataTableColumnHeader>التاريخ</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>
        {row.original.date.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "status",
    header: () => <DataTableColumnHeader>الحالة</DataTableColumnHeader>,
    cell: ({ row }) => {
      let status;
      if (row.original.status === "CANCELLED")
        status = (
          <StatusBadge className="bg-orange-200 text-orange-800">
            ملغية
          </StatusBadge>
        );
      else if (row.original.status === "DONE")
        status = (
          <StatusBadge className="bg-green-200 text-green-800">تمت</StatusBadge>
        );
      else
        status = (
          <StatusBadge className="bg-orange-200 text-orange-800">
            انتظار
          </StatusBadge>
        );
      return <DataTableItem>{status}</DataTableItem>;
    },
  },
];
