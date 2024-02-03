"use client";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/global/DataTableColumnHeader";
import { DataTableItem } from "@/components/global/DataTableItem";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDate } from "@/lib/date";
import { AiOutlineCheck } from "react-icons/ai";
import { updateMoneyRequest } from "@/actions/money";
import { MdCancel } from "react-icons/md";
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
    accessorKey: "name",
    header: () => <DataTableColumnHeader>الاسم</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>{row.original.doctor.doctor.name}</DataTableItem>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <DataTableColumnHeader className="text-center">
        التاريح
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <DataTableItem className="text-center">
        {formatDate(row.original.date)}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "Money",
    header: () => <DataTableColumnHeader>المبلغ</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.original.money}$</DataTableItem>,
  },
  {
    accessorKey: "status",
    header: () => <DataTableColumnHeader>الحالة</DataTableColumnHeader>,
    cell: ({ row }) => {
      let status;
      if (row.original.status === "DONE")
        status = (
          <StatusBadge className="bg-green-200 text-green-800">تمت</StatusBadge>
        );
      else
        status = (
          <StatusBadge className="bg-orange-200 text-orange-800">
            ملغية
          </StatusBadge>
        );
      return <StatusBadge>{status}</StatusBadge>;
    },
  },
];
