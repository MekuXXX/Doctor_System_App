import { getMasters } from "@/actions/master";
import AddDoctor from "@/components/dashboard/AddDoctor";
import React, { Suspense } from "react";

type Props = {};

export default async function AddDoctorPage() {
  const masters = await getMasters();

  // TODO: add error in loading masters
  if (masters.error) return <h1>Error in loading masters</h1>;

  return (
    <div className="content">
      <div className="max-w-2xl mx-auto bg-white dark:bg-dark p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-extrabold text-center mt-4 mb-8">
          اضافة طبيب
        </h1>
        <Suspense fallback={<h1>loading...</h1>}>
          <AddDoctor masters={masters.data!} />
        </Suspense>
      </div>
    </div>
  );
}
