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
import { FaClipboard } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeCoupon } from "@/actions/coupon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    cell: ({ row }) => <DataTableItem>{row.getValue("name")}</DataTableItem>,
  },
  {
    accessorKey: "email",
    header: () => <DataTableColumnHeader>الحساب</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.getValue("email")}</DataTableItem>,
  },
  {
    accessorKey: "role",
    header: () => <DataTableColumnHeader>الدور</DataTableColumnHeader>,
    cell: ({ row }) => {
      let role = row.getValue("role");
      role = role === "USER" ? "مستخدم" : role === "DOCTOR" ? "طبيب" : "أدمن";
      return <DataTableItem>{role as string}</DataTableItem>;
    },
  },
];
