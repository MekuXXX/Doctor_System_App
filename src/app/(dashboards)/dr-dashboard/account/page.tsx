import { getDoctorByEmail } from "@/actions/doctor";
import { readImage } from "@/actions/images";
import { getMasters } from "@/actions/master";
import { auth } from "@/auth";
import EditDoctor from "@/components/dashboard/EditDoctor";
import { notFound } from "next/navigation";
import React from "react";

type Props = {};

export default async function AccountPage({}: Props) {
  const user = await auth();
  if (!user) notFound();
  if (user.user.role !== "DOCTOR") notFound();

  const data = await getDoctorByEmail(user.user.email!);
  // TODO: add error in loading doctor data
  if (data.error) return <h1>Error in loading doctor data</h1>;
  const image = await readImage(data.data?.image!);

  const masters = await getMasters();
  // TODO: add error in loading masters
  if (masters.error) return <h1>Error in loading masters</h1>;

  return (
    <div className="content place-content-center">
      <div className="max-w-2xl mx-auto bg-white dark:bg-dark p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-center mt-4 mb-8">
          تعديل الطبيب
        </h1>
        <EditDoctor
          data={data.data as any}
          email={data.data?.email!}
          mastersProps={masters.data!}
          image={image}
          role={user.user.role!}
        />
      </div>
    </div>
  );
}
