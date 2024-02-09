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
import { formatDate } from "@/lib/date";

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
    accessorKey: "coupon",
    header: () => <DataTableColumnHeader>رمز الكوبون</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.getValue("coupon")}</DataTableItem>,
  },
  {
    accessorKey: "type",
    header: () => (
      <DataTableColumnHeader className="text-center">
        مدة الكوبون
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      let time;
      if (row.original.type === "LIMITED") time = "دائم";
      else {
        time = (
          <>
            {formatDate(row.original.from)}
            <br />
            {formatDate(row.original.to)}
          </>
        );
      }
      return <DataTableItem className="text-center">{time}</DataTableItem>;
    },
  },
  {
    accessorKey: "discount",
    header: () => <DataTableColumnHeader>الخصم</DataTableColumnHeader>,
    cell: ({ row }) => {
      let value;
      if (row.original.discountType === "VALUE")
        value = row.original.discountValue + "$";
      else value = row.original.discountValue + "%";
      return <DataTableItem>{value}</DataTableItem>;
    },
  },
  {
    accessorKey: "useTimes",
    header: ({ column }) => (
      <DataTableColumnHeader>الاستخدامات</DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <DataTableItem>
        {row.original.type === "unlimited"
          ? "غير محدود"
          : row.original.useTimes}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "Actions",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: function Cell({ row }) {
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const res = await removeCoupon(id as string);
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
              onClick={() =>
                navigator.clipboard.writeText(row.getValue("coupon"))
              }
            >
              <FaClipboard className="h-[1.2rem] w-[1.2rem]" />
              <span>نسخ الكوبون</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={handleDelete}
            >
              <MdDelete className="h-[1.2rem] w-[1.2rem]" />
              <span>حذف الكوبون</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
