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
import moment from "moment";
import { convertToAmAndPm } from "@/lib/moment";
import { removePaymentLink } from "@/actions/payment-link";

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
    accessorKey: "date",
    header: () => <DataTableColumnHeader>التاريخ</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>
        {moment(row.original.date).format("DD-MM-YYYY")}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "time",
    header: () => <DataTableColumnHeader>الوقت</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>{convertToAmAndPm(row.original.time)}</DataTableItem>
    ),
  },
  {
    accessorKey: "price",
    header: () => (
      <DataTableColumnHeader className="text-center">
        المبلغ
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      console.log(row.original);
      return (
        <DataTableItem className="text-center">
          {row.original.doctorPrice + row.original.customPrice}$
        </DataTableItem>
      );
    },
  },
  {
    accessorKey: "link",
    header: () => <DataTableColumnHeader>رابط الدفع</DataTableColumnHeader>,
    cell: ({ row }) => {
      return (
        <DataTableItem>{`${process.env.NEXT_PUBLIC_BASE_URL}/pay?paymentLink=${row.original.token}`}</DataTableItem>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: function Cell({ row }) {
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        const res = await removePaymentLink(id as string);
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
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/pay?paymentLink=${row.original.token}`
                )
              }
            >
              <FaClipboard className="h-[1.2rem] w-[1.2rem]" />
              <span>نسخ الرابط</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={handleDelete}
            >
              <MdDelete className="h-[1.2rem] w-[1.2rem]" />
              <span>حذف الرابط</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
