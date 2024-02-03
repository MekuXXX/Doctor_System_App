"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/global/DataTableColumnHeader";
import { DataTableItem } from "@/components/global/DataTableItem";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { editMaster, removeMaster } from "@/actions/master";
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
import AlertConfirm from "@/components/global/AlertConfirm";

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
    accessorKey: "description",
    header: () => <DataTableColumnHeader>الوصف</DataTableColumnHeader>,
    cell: ({ row }) => (
      <DataTableItem>{row.getValue("description")}</DataTableItem>
    ),
  },
  {
    accessorKey: "id",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const router = useRouter();
      const handleDelete = async () => {
        const res = await removeMaster(id);
        if (res.success) {
          toast.success(res.success);
        } else {
          toast.error(res.error);
        }
        router.refresh();
      };

      const handleEdit = async (data: FormData) => {
        const name = data.get("name") as string;
        const description = data.get("description") as string;

        const res = await editMaster(id, name, description);
        if (res.success) {
          toast.success(res.success);
          router.refresh();
        } else {
          toast.error(res.error);
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
              <form action={handleEdit} className="space-y-2">
                <div>
                  <label htmlFor="name">الاسم</label>
                  <Input name="name" id="name" required />
                </div>
                <div>
                  <label htmlFor="description">الوصف</label>
                  <Input name="description" id="description" required />
                </div>
                <AlertDialogAction type="submit" className="w-full">
                  تعديل
                </AlertDialogAction>
              </form>
              <AlertDialogCancel>الغاء</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
          <AlertConfirm
            header="هل أنت متأكد من حذف التخصص؟"
            description=""
            alerFn={handleDelete}
          >
            <Button variant={"destructive"}>
              <MdDelete />
            </Button>
          </AlertConfirm>
        </DataTableItem>
      );
    },
  },
];
