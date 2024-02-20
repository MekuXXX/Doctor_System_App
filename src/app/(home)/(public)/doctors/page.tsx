import React from "react";
import DoctorsView from "@/components/main/DoctorsView";
import { db } from "@/lib/db";
import { isUserOnline } from "@/lib/compare-times";
import { isDoctorBusy } from "@/actions/doctor";

type Props = {
  params: {};
  searchParams: {
    search?: string;
  };
};

export default async function DoctorsPage({ searchParams }: Props) {
  const doctors = await db.user.findMany({
    where: { role: "DOCTOR", name: { contains: searchParams.search } },
    select: {
      id: true,
      name: true,
      image: true,
      DoctorData: {
        select: {
          id: true,
          master: {
            select: { name: true },
          },
          doctorActive: {
            select: {
              isActive: true,
              from: true,
              to: true,
            },
          },
          Rate: true,
          doctorSessions: true,
        },
      },
    },
  });

  const busyDoctors: any[] = [];
  const activeDoctors: any[] = [];
  const inActiveDoctors: any[] = [];

  for (let doctor of doctors) {
    const isBusy = await isDoctorBusy(doctor?.id);
    if (isBusy) {
      busyDoctors.push(doctor);
    } else if (
      doctor.DoctorData?.doctorActive?.isActive &&
      isUserOnline(
        doctor?.DoctorData?.doctorActive?.from!,
        doctor?.DoctorData?.doctorActive?.to!
      )
    )
      activeDoctors.push(doctor);
    else inActiveDoctors.push(doctor);
  }

  return (
    <div className="content">
      {activeDoctors.length !== 0 && (
        <DoctorsView
          title="المتاحين الان"
          description="بامكانك الحجز والتحدث فوراً"
          doctors={activeDoctors!}
          isActive={true}
          className="feature"
        />
      )}
      {inActiveDoctors.length !== 0 && (
        <DoctorsView
          title="الغير متاحين الان"
          description="يمكنك الحجز من خلال الجدول الوقت الذي يناسبك"
          doctors={inActiveDoctors as any}
          isActive={false}
          className="feature"
        />
      )}
      {activeDoctors.length === 0 &&
        inActiveDoctors.length === 0 &&
        busyDoctors.length === 0 && (
          <p className="text-xl my-8 font-extrabold text-center">
            لا توجد نتائج
          </p>
        )}
    </div>
  );
}
