import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { columns } from "./data-table";
import { db } from "@/lib/db";
import { FaPlus } from "react-icons/fa6";
import { UserRole } from "@prisma/client";
import { getMembers } from "@/actions/member";

type Props = {
  searchParams: {
    role?: UserRole;
  };
};

export default async function MembersPage({ searchParams }: Props) {
  const { role } = searchParams;
  const getData = async () => {
    "use server";
    const data = await getMembers(role);
    return data.data;
  };
  const data = await getData();

  return (
    <div className="content">
      <div>
        <Link
          href={"/dashboard/members"}
          className={role === undefined ? " font-extrabold" : ""}
        >
          <Button variant={"link"}>الكل</Button>
        </Link>

        <Link
          href={"/dashboard/members?role=USER"}
          className={role === "USER" ? " font-extrabold" : ""}
        >
          <Button variant={"link"}>المستخدمين</Button>
        </Link>

        <Link
          href={"/dashboard/members?role=DOCTOR"}
          className={role === "DOCTOR" ? " font-extrabold" : ""}
        >
          <Button variant={"link"}>الأطباء</Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        keys={["users", String(role) || ""]}
        queryFn={getData as any}
        queryFnParams={[role] as any}
        chilrendButtons={
          role === "DOCTOR" && (
            <Link href={"/dashboard/members/add-doctor"}>
              <Button variant={"outline"}>
                <FaPlus />
                <span className="hidden lg:block">إضافة طبيب</span>
              </Button>
            </Link>
          )
        }
      />
    </div>
  );
}
