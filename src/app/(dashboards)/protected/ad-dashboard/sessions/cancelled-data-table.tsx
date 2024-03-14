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
import { getDoctorSessionTimeByType } from "@/lib/doctor-session";
import { StatusBadge } from "@/components/main/StatusBadge";
import { useTransition } from "react";
import { changeMoneyToReady, deleteMoneyFromPending } from "@/actions/money";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
        <StatusBadge className="bg-red-600 text-white">ملغية</StatusBadge>
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
      const router = useRouter();

      const handleAcceptDoctor = () => {
        startTransition(async () => {
          const [res_1, res_2, res_3] = await Promise.all([
            deleteMoneyFromPending(
              row.original.doctor.id,
              row.original.doctorPrice
            ),
            changeMoneyToReady(row.original.doctorId, row.original.doctorPrice),

            changeSessionStatus(row.original.id, "DONE"),
          ]);
          if (res_1.error || res_2.error || res_3.error) {
            toast.error(`حدث خطأ أثناء تحديث المقابلة`);
          } else {
            toast.success(`تم تحديث المقابلة بنجاح`);
            router.refresh();
          }
        });
      };
      const handleDeleteDoctorMoney = () => {
        startTransition(async () => {
          const [res_1, res_2] = await Promise.all([
            deleteMoneyFromPending(
              row.original.doctor.id,
              row.original.doctorPrice
            ),
            changeSessionStatus(row.original.id, "CANCELLED_DONE"),
          ]);
          if (res_1.error || res_2.error)
            toast.error(`حدث خطأ أثناء رد المبلغ للعميل`);
          else {
            toast.success(`تم رد المبلغ بنجاح`);

            router.refresh();
          }
        });
      };

      return (
        <>
          {row.original.status === "CANCELLED" ? (
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
                  onClick={handleAcceptDoctor}
                  disabled={isPending}
                >
                  <span>تحول المبلغ للطبيب</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 items-center"
                  onClick={handleDeleteDoctorMoney}
                  disabled={isPending}
                >
                  <span>رد المبلغ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span>تم رد المبلغ للعميل</span>
          )}
        </>
      );
    },
  },
];
