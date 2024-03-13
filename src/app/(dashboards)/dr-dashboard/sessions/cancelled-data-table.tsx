"use client";
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
import { changeMoneyToReady } from "@/actions/money";
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

      const changeToDone = async () => {
        await changeSessionStatus(row.original.id, "DONE");
        router.refresh();
      };

      const handleAcceptDoctor = () => {
        startTransition(async () => {
          const res = await changeMoneyToReady(
            row.original.doctorId,
            row.original.doctorPrice
          );
          if (res.error) {
            toast.error(res.error);
          } else {
            await changeToDone();
            toast.success(res.success);
          }
        });
      };
      const handleDeleteDoctorMoney = () => {
        startTransition(async () => {
          const res = await changeMoneyToReady(
            row.original.doctorId,
            row.original.doctorPrice
          );
          if (res.error) toast.error(res.error);
          else {
            toast.success(res.success);
          }
        });
      };

      return (
        <>
          {row.original.status === "CANCELLED" ? (
            <span>بانتظار المراجعة</span>
          ) : (
            <span>تم رد المبلغ للعميل</span>
          )}
        </>
      );
    },
  },
];
