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
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { removeMember } from "@/actions/member";

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
    accessorKey: "DoctorData",
    header: () => (
      <DataTableColumnHeader className="text-right">
        الاسم اللطيف
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <DataTableItem className="flex items-center gap-2 w-fit">
        <div className="w-24 h-24 relative rounded-full overflow-clip">
          <Image
            src={row.original.image}
            alt={row.original.name}
            sizes={"6rem"}
            fill
            className="object-cover"
          />
        </div>
        <span>{row.original.DoctorData}</span>
      </DataTableItem>
    ),
  },
  {
    accessorKey: "name",
    header: () => <DataTableColumnHeader>الاسم</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.getValue("name")}</DataTableItem>,
  },
  {
    accessorKey: "email",
    header: () => <DataTableColumnHeader>الحساب</DataTableColumnHeader>,
    cell: ({ row }) => <DataTableItem>{row.getValue("email")}</DataTableItem>,
  },
  {
    accessorKey: "role",
    header: () => <DataTableColumnHeader>الدور</DataTableColumnHeader>,
    cell: ({ row }) => {
      let role = row.getValue("role");
      role = role === "USER" ? "مستخدم" : role === "DOCTOR" ? "طبيب" : "أدمن";
      return <DataTableItem>{role as string}</DataTableItem>;
    },
  },
  {
    accessorKey: "Actions",
    header: () => <DataTableColumnHeader>تعديلات</DataTableColumnHeader>,
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;
      const handleDelete = async () => {
        let res = await removeMember(id);
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
            <a href={"/dashboard/members/edit-doctor?id=" + id}>
              <DropdownMenuItem className="flex gap-2 items-center">
                <FaPen className="h-[1.2rem] w-[1.2rem]" />
                <span>تعديل</span>
              </DropdownMenuItem>
            </a>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={handleDelete}
            >
              <MdDelete className="h-[1.2rem] w-[1.2rem]" />
              <span>حذف</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
