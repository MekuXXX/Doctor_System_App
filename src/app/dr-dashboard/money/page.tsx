import { auth } from "@/auth";
import { DoctorMoneyRequest } from "@/components/dashboard/DoctorMoneyRequest";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./data-table";
import { DataTable } from "@/components/dashboard/Tables/DataTable";
import { getDoctorRequests } from "@/actions/money";

type Props = {};

export default async function MoneyPage({}: Props) {
  const user = await auth();
  if (!user) redirect("/");
  const email = user.user.email!;
  const getData = async () => {
    "use server";
    const data = await getDoctorRequests(email);
    if (data.error) [];
    return data.data;
  };
  const data = await getData();

  return (
    <div className="content">
      <DoctorMoneyRequest email={email} />
      <DataTable
        columns={columns}
        data={data!}
        keys={["doctor", "money", "requests"]}
        queryFn={getData as any}
        searchIn="coupon"
      />
    </div>
  );
}
