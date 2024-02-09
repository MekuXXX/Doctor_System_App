import { ADMIN_DASHBOARD } from "@/routes";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import EditUser from "@/components/dashboard/EditUser";
import { auth } from "@/auth";

type Props = {
  searchParams: {
    id: string;
  };
};
export default async function AddDoctorPage({ searchParams }: Props) {
  const user = await auth();
  if (!user) notFound();

  const data = await db.user.findUnique({
    where: { email: user.user.email!, role: "USER" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      gender: true,
      phone: true,
    },
  });
  if (!data) redirect("/");

  return (
    <div className="content place-content-center">
      <div className="max-w-2xl mx-auto bg-white dark:bg-dark p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-center mt-4 mb-8">
          تعديل المستخدم
        </h1>
        <EditUser
          user={data as any}
          email={data.email!}
          role={user.user.role}
        />
      </div>
    </div>
  );
}
