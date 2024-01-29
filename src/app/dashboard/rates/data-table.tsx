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
import { FaClipboard, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeCoupon } from "@/actions/coupon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeRate } from "@/actions/rate";
import Link from "next/link";

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
    accessorKey: "doctor",
    header: () => <DataTableColumnHeader>الطبيب</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.getValue("doctor")}</DataTableItem>,
  },
  {
    accessorKey: "rate",
    header: () => <DataTableColumnHeader>التقييم</DataTableColumnHeader>,
    cell: ({ row }) => {
      console.log(row.original);
      return <DataTableItem>{row.original.rate}</DataTableItem>;
    },
  },
  {
    accessorKey: "message",
    header: () => <DataTableColumnHeader>الرسالة</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem className="">{row.getValue("message")}</DataTableItem>
    ),
  },
  {
    accessorKey: "patient",
    header: ({ column }) => (
      <DataTableColumnHeader>المقييم</DataTableColumnHeader>
    ),
    cell: ({ row }) => <DataTableItem>{row.getValue("patient")}</DataTableItem>,
  },
  {
    accessorKey: "Actions",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const res = await removeRate(id as string);
        if (res.success) {
          toast.success(res.success);
        } else {
          toast.error(res.error);
        }
        router.refresh();
      };

      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <BsThreeDots />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <a href={"/dashboard/rates/edit-rate?id=" + id}>
              <DropdownMenuItem className="flex gap-2 items-center">
                <FaPen className="h-[1.2rem] w-[1.2rem]" />
                <span>تعديل التقييم</span>
              </DropdownMenuItem>
            </a>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={handleDelete}
            >
              <MdDelete className="h-[1.2rem] w-[1.2rem]" />
              <span>حذف التقييم</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
