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
import StarRate from "@/components/main/StarRate";
import { ADMIN_DASHBOARD } from "@/routes";
import moment from "moment";
import { getDoctorSessionTimeByType } from "@/lib/doctor-session";

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
    accessorKey: "patient",
    header: () => <DataTableColumnHeader>المريض</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.original.user.name}</DataTableItem>,
  },
  {
    accessorKey: "remain",
    header: () => <DataTableColumnHeader>المتبقى</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.original.remain}</DataTableItem>,
  },
  {
    accessorKey: "type",
    header: () => <DataTableColumnHeader>النوع</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>
        {getDoctorSessionTimeByType(row.original.type)} دقيقة
      </DataTableItem>
    ),
  },
  {
    accessorKey: "price",
    header: () => <DataTableColumnHeader>السعر</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>{row.original.patientPrice}$</DataTableItem>
    ),
  },
  {
    accessorKey: "coupon",
    header: () => <DataTableColumnHeader>الكوبون</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>
        {!row.original.coupon ? "لا يوجد" : row.original.coupon}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "valid_date",
    header: () => <DataTableColumnHeader>تاريخ الانتهاء</DataTableColumnHeader>,
    cell: function Cell({ row }) {
      return (
        <DataTableItem>
          {moment(row.original.validUntil).format("YYYY-MM-DD hh:ss A")}
        </DataTableItem>
      );
    },
  },
  // {
  //   accessorKey: "rate",
  //   header: () => (
  //     <DataTableColumnHeader className="text-center">
  //       التقييم
  //     </DataTableColumnHeader>
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <DataTableItem>
  //         <StarRate className=" justify-center" rate={row.original.rateValue} />
  //       </DataTableItem>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "message",
  //   header: () => <DataTableColumnHeader>الرسالة</DataTableColumnHeader>,
  //   cell: ({ row }) => (
  //     <DataTableItem className="">{row.original.message}</DataTableItem>
  //   ),
  // },
  // {
  //   accessorKey: "Actions",
  //   header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
  //   cell: function Cell({ row }) {
  //     const router = useRouter();
  //     const id = row.original.id;
  //     const handleDelete = async () => {
  //       const res = await removeRate(id as string);
  //       if (res.success) {
  //         toast.success(res.success);
  //       } else {
  //         toast.error(res.error);
  //       }
  //       router.refresh();
  //     };

  //     return (
  //       <DropdownMenu dir="rtl">
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost">
  //             <BsThreeDots />
  //             <span className="sr-only">Open menu</span>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent>
  //           <a href={`${ADMIN_DASHBOARD}/rates/edit-rate?id=${id}`}>
  //             <DropdownMenuItem className="flex gap-2 items-center">
  //               <FaPen className="h-[1.2rem] w-[1.2rem]" />
  //               <span>تعديل التقييم</span>
  //             </DropdownMenuItem>
  //           </a>
  //           <DropdownMenuItem
  //             className="flex gap-2 items-center"
  //             onClick={handleDelete}
  //           >
  //             <MdDelete className="h-[1.2rem] w-[1.2rem]" />
  //             <span>حذف التقييم</span>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
