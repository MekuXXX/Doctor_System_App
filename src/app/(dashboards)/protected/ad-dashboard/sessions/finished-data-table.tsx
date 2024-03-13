"use client";
import { Button } from "@/components/ui/button";
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
import { MdDelete } from "react-icons/md";
import { deleteSessions } from "@/actions/sessions";
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
    cell: ({ row }) => (
      <DataTableItem>
        <StatusBadge className="bg-green-600 text-white">تمت</StatusBadge>
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
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: function Cell({ row }) {
      const router = useRouter();

      const handleDelete = async () => {
        const res = await deleteSessions([row.original.id]);
        if (res.success) {
          toast.success(res.success);
          router.refresh();
        } else {
          toast.error(res.error);
        }
      };

      return (
        <DataTableItem className="flex gap-2 justify-end">
          <Button variant={"destructive"} onClick={handleDelete}>
            <MdDelete className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DataTableItem>
      );
    },
  },
];
