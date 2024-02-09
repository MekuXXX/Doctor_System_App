import DiscountBadge from "@/components/main/DiscountBadge";
import DoctorsView from "@/components/main/DoctorsView";
import FAQ from "@/components/main/FAQ";
import MainSearch from "@/components/main/MainSearch";
import { isUserOnline } from "@/lib/compare-times";
import { db } from "@/lib/db";
import React from "react";

type Props = {
  params: {};
  searchParams: {
    text?: string;
    price?: string;
    gender?: string;
  };
};

export default async function page({ searchParams }: Props) {
  const doctors = await db.user.findMany({
    where: { role: "DOCTOR" },
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
        },
      },
    },
  });

  const activeDoctors: any[] = [];
  const inActiveDoctors: any[] = [];
  doctors.forEach((doctor) => {
    const isActive = isUserOnline(
      doctor?.DoctorData?.doctorActive?.from!,
      doctor?.DoctorData?.doctorActive?.to!
    );
    if (doctor.DoctorData?.doctorActive?.isActive && isActive)
      activeDoctors.push(doctor);
    else inActiveDoctors.push(doctor);
  });
  return (
    <div className="content">
      <MainSearch />
      <DiscountBadge />

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
      {/* {availableNow.length === 0 && notAvailableNow.length === 0 && (
        <p className="text-xl my-8 font-extrabold text-center">لا توجد نتائج</p>
      )} */}
      <FAQ />
    </div>
  );
}
