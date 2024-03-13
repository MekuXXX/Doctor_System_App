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
import moment from "moment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoStar } from "react-icons/io5";
import { getDoctorSessionTimeByType } from "@/lib/doctor-session";
import { StatusBadge } from "@/components/main/StatusBadge";
import { toast } from "sonner";
import { FaClipboard } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogContent,
} from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useTransition } from "react";
import { changeMoneyToReady } from "@/actions/money";
import { changeSessionStatus } from "@/actions/sessions";

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
    header: () => <DataTableColumnHeader>المعالج</DataTableColumnHeader>,
    cell: ({ row }) => {
      return <DataTableItem>{row.original.doctor?.doctor?.name}</DataTableItem>;
    },
  },
  {
    accessorKey: "patient",
    header: () => <DataTableColumnHeader>المريض</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>{row.original?.user?.name}</DataTableItem>
    ),
  },

  {
    accessorKey: "status",
    header: () => <DataTableColumnHeader>الحالة</DataTableColumnHeader>,
    cell: () => (
      <DataTableItem>
        <StatusBadge className="bg-blue-600 text-white">محجوز</StatusBadge>
      </DataTableItem>
    ),
  },
  {
    accessorKey: "details",
    header: () => (
      <DataTableColumnHeader className="text-start">
        البيانات
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const date = moment(row.original.date);

      return (
        <DataTableItem>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger>
                {date.format("YYYY-MM-DD hh:ss A")}
              </AccordionTrigger>
              <AccordionContent className="text-start">
                <p>
                  <strong className="font-bold text-md">المدة</strong>
                  <span>
                    {" "}
                    {getDoctorSessionTimeByType(row.original.type)} دقيقة
                  </span>
                </p>

                <p>
                  <strong className="font-bold text-md">سعر الجلسة</strong>
                  <span> {row.original.sessionPrice}</span>
                </p>

                <p>
                  <strong className="font-bold text-md">سعر المريض</strong>
                  <span> {row.original.patientPrice}</span>
                </p>

                <p>
                  <strong className="font-bold text-md">سعر الطبيب</strong>
                  <span> {row.original.doctorPrice}</span>
                </p>

                <p>
                  <strong className="font-bold text-md"> الكوبون</strong>
                  <span>
                    {" "}
                    {row.original.coupon ? row.original.coupon : "لا يوجد"}
                  </span>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DataTableItem>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => (
      <DataTableColumnHeader className="text-end">
        تعديلات
      </DataTableColumnHeader>
    ),
    cell: function Cell({ row }) {
      const [isPending, startTransition] = useTransition();
      const sessionTime = getDoctorSessionTimeByType(row.original.sessionType);
      const currentDate = moment().toDate();
      const sessionDate = moment(row.original.date);
      const refundDate = sessionDate.subtract(12, "hours").toDate();
      const rateDate = sessionDate.add(sessionTime, "minutes").toDate();

      const handleDelete = () => {
        startTransition(async () => {
          const res = await changeMoneyToReady(
            row.original.doctorId,
            row.original.doctorPrice
          );
          if (res.error) toast.error(res.error);
          else {
            await changeSessionStatus(row.original.id, "DONE");
            toast.success(res.success);
          }
        });
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
            {currentDate > rateDate && (
              <a href={`/add-rate?sessionId=${row.original.id}`}>
                <DropdownMenuItem
                  className="flex gap-2 items-center"
                  disabled={isPending}
                >
                  <IoStar />
                  اضافة تقييم
                </DropdownMenuItem>
              </a>
            )}
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/session?roomId=${row.original.link}`
                )
              }
              disabled={isPending}
            >
              <FaClipboard className="h-[1.2rem] w-[1.2rem]" />
              <span>نسخ الرابط</span>
            </DropdownMenuItem>
            {refundDate > currentDate ? (
              <Link href={`/change-session?sessionId=${row.original.id}`}>
                <DropdownMenuItem
                  className="flex gap-2 items-center"
                  disabled={isPending}
                >
                  <MdDelete className="h-[1.2rem] w-[1.2rem]" />
                  <span>تأجيل</span>
                </DropdownMenuItem>
              </Link>
            ) : (
              !(currentDate > rateDate) && (
                <DropdownMenuItem
                  className="flex gap-2 items-center"
                  disabled={isPending}
                  onClick={handleDelete}
                >
                  <MdDelete className="h-[1.2rem] w-[1.2rem]" />
                  <span>الغاء</span>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
