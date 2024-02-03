import EditDoctor from "@/components/dashboard/EditDoctort";
import { ADMIN_DASHBOARD } from "@/lib/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    id: string;
  };
};
export default async function AddDoctorPage({ searchParams }: Props) {
  const { id } = searchParams;
  if (!id) redirect(`/${ADMIN_DASHBOARD}/rates`);
  const data = await db.user.findUnique({
    where: { id },
    include: { DoctorData: true },
  });
  if (!data) redirect(`/${ADMIN_DASHBOARD}/rates`);
  const masters = await db.master.findMany();
  return (
    <div className="content place-content-center">
      <div className="max-w-2xl mx-auto bg-white dark:bg-dark p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-center mt-4 mb-8">
          تعديل الطبيب
        </h1>
        <EditDoctor masters={masters} data={data as any} id={id} />
      </div>
    </div>
  );
}
