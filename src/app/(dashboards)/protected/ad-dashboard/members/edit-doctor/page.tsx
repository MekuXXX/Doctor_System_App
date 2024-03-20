import EditDoctor from "@/components/dashboard/EditDoctor";
import { ADMIN_DASHBOARD } from "@/routes";
import { redirect } from "next/navigation";
import React from "react";
import { getMasters } from "@/actions/master";
import { getDoctorById } from "@/actions/doctor";
import { auth } from "@/auth";
import { readImage } from "@/actions/images";

type Props = {
  searchParams: {
    id: string;
  };
};
export default async function AddDoctorPage({ searchParams }: Props) {
  const user = await auth();
  if (!user) redirect("/");
  const { id } = searchParams;
  if (!id) redirect(`${ADMIN_DASHBOARD}/members`);

  const data = await getDoctorById(id);

  // TODO: add error in loading doctor data
  if (data.error) return <h1>Error in loading doctor data</h1>;

  if (!data) redirect(`${ADMIN_DASHBOARD}/members`);

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
          role={user?.user.role!}
          image={image}
        />
      </div>
    </div>
  );
}
