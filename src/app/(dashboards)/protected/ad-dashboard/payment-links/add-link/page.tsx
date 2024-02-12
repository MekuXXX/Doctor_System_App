import { getSelectDoctors } from "@/actions/doctor";
import { AddPaymentLink } from "@/components/dashboard/AddPaymentLink";
import React from "react";

type Props = {};

export default async function AddCouponPage({}: Props) {
  const initialData = await getSelectDoctors();

  return (
    <div className="content max-w-fit mx-auto border-2 rounded-xl my-8  px-6 py-12 bg-white dark:bg-dark">
      <h1 className="text-2xl mb-8">إضافة رابط جديد</h1>
      <AddPaymentLink
        initialData={initialData.data!}
        getDoctors={getSelectDoctors as any}
      />
    </div>
  );
}
