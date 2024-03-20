import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { columns } from "./data-table";
import { FaPlus } from "react-icons/fa6";
import { UserRole } from "@prisma/client";
import { getMembers } from "@/actions/member";
import { ADMIN_DASHBOARD } from "@/routes";
import { db } from "@/lib/db";
import { readImage } from "@/actions/images";

type Props = {
  searchParams: {
    role?: UserRole;
  };
};

export default async function MembersPage({ searchParams }: Props) {
  let { role } = searchParams;
  const getData = async () => {
    "use server";
    let newRole = role;
    if (!Object.keys(UserRole).includes(role as string)) newRole = undefined;
    const data = await db.user.findMany({
      where: { role: { not: "ADMIN", equals: newRole } },
    });
    const newData: typeof data = [];
    for (const user of data) {
      const image = await readImage(user.image);
      user.image = image;
      newData.push(user);
    }
    return newData;
  };
  const data = await getData();

  return (
    <div className="content">
      <div>
        <Link
          href={`${ADMIN_DASHBOARD}/members`}
          className={role === undefined ? " font-extrabold" : ""}
        >
          <Button variant={"link"}>الكل</Button>
        </Link>

        <Link
          href={`${ADMIN_DASHBOARD}/members?role=USER`}
          className={role === "USER" ? " font-extrabold" : ""}
        >
          <Button variant={"link"}>المستخدمين</Button>
        </Link>

        <Link
          href={`${ADMIN_DASHBOARD}/members?role=DOCTOR`}
          className={role === "DOCTOR" ? " font-extrabold" : ""}
        >
          <Button variant={"link"}>الأطباء</Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        keys={["members", String(role) || "all"]}
        queryFn={getData as any}
        queryFnParams={[role] as any}
        childrenButtons={
          role === "DOCTOR" && (
            <Link href={`${ADMIN_DASHBOARD}/members/add-doctor`}>
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
