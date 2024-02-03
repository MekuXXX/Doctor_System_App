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
    accessorKey: "Actions",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;
      const handleDone = async () => {
        const res = await updateMoneyRequest(id, "DONE");
        if (res.success) {
          toast.success(res.success);
        } else {
          toast.error(res.error);
        }
        router.refresh();
      };

      const handleCancelled = async () => {
        const res = await updateMoneyRequest(id, "CANCELLED");
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
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={handleCancelled}
            >
              <MdCancel className="h-[1.2rem] w-[1.2rem]" />
              <span>الغاء التحويل</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={handleDone}
            >
              <AiOutlineCheck className="h-[1.2rem] w-[1.2rem]" />
              <span>تم التحويل</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
