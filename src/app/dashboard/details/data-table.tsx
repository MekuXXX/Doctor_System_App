"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/global/DataTableColumnHeader";
import { DataTableItem } from "@/components/global/DataTableItem";
import { FaPen } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaFlag } from "react-icons/fa";

import StarRate from "@/components/main/StarRate";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctorDetailsSchema, doctorRanks } from "@/schemas/doctorDetails";
import { editDoctorDetails } from "@/actions/doctor";

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
    accessorKey: "rate",
    header: () => (
      <DataTableColumnHeader className="text-center">
        التقييم
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      return (
        <DataTableItem>
          <div className="flex justify-center">
            <StarRate rate={Number(row.getValue("rate"))} />
          </div>
        </DataTableItem>
      );
    },
  },

  {
    accessorKey: "master",
    header: () => <DataTableColumnHeader>التخصص</DataTableColumnHeader>,
    cell: ({ row }) => {
      return <DataTableItem>{row.getValue("master")}</DataTableItem>;
    },
  },

  {
    accessorKey: "all-price",
    header: () => <DataTableColumnHeader>السعر الكلى</DataTableColumnHeader>,
    cell: ({ row }) => {
      return <DataTableItem>100$</DataTableItem>;
    },
  },

  {
    accessorKey: "can-use",
    header: () => <DataTableColumnHeader>القابل للسحب</DataTableColumnHeader>,
    cell: ({ row }) => {
      return <DataTableItem>30$</DataTableItem>;
    },
  },

  {
    accessorKey: "price",
    header: () => <DataTableColumnHeader>ثمن الجلسة</DataTableColumnHeader>,
    cell: ({ row }) => {
      return <DataTableItem>15$</DataTableItem>;
    },
  },
  {
    accessorKey: "id",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: ({ row }) => {
      const rowData = row.original;
      const router = useRouter();
      const handleEdit = async (data: FormData) => {
        const doctorRank = data.get("rank") as string;
        const doctorDiscount = data.get("discount") as string;
        const parsedData = await doctorDetailsSchema.safeParse({
          doctorRank,
          doctorDiscount,
        });
        if (!parsedData.success) toast.error("خطأ فى البيانات المدخلة");
        else {
          const res = await editDoctorDetails(rowData.id, parsedData.data);
          if (res.success) {
            toast.success(res.success);
            router.refresh();
          } else {
            toast.error(res.error);
          }
        }
      };

      return (
        <DataTableItem className="flex gap-2 justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <FaPen />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
              <div className="w-24 h-24 relative rounded-full overflow-clip mx-auto">
                <Image
                  src={rowData.image}
                  alt={rowData.name}
                  fill
                  className=" object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className=" font-bold text-2xl my-4">{rowData.name}</h2>
                <p>{rowData.master}</p>
                <p className="flex justify-center gap-2">
                  <strong className="flex gap-1 items-center">
                    <FaFlag /> الدولة
                  </strong>
                  {rowData.country}
                </p>
                <p className="flex justify-center gap-2">
                  <strong className="flex gap-1 items-center">
                    <MdEmail /> الحساب
                  </strong>
                  {rowData.email}
                </p>
              </div>
              <form action={handleEdit} className="space-y-4">
                <div>
                  <label htmlFor="rank">الرتبة</label>
                  <Select defaultValue={rowData["Doctor Rank"]} name="rank">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorRanks.map((rank) => (
                        <SelectItem value={rank} key={rank}>
                          {rank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="discount">الخصم</label>
                  <Input
                    name="discount"
                    id="discount"
                    min={0}
                    max={100}
                    type="number"
                    defaultValue={rowData["Doctor Discount"]}
                    required
                  />
                </div>
                <AlertDialogAction type="submit" className="w-full">
                  تعديل
                </AlertDialogAction>
              </form>
              <AlertDialogCancel>الغاء</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </DataTableItem>
      );
    },
  },
];
