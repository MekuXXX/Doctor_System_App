import { getDoctors } from "@/actions/doctor";
import DiscountBadge from "@/components/main/DiscountBadge";
import DoctorsView, { RenderedDoctorData } from "@/components/main/DoctorsView";
import FAQ from "@/components/main/FAQ";
import MainSearch from "@/components/main/MainSearch";
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
  // data = data.filter(
  //   (p) =>
  //     p.gender === searchParams.gender &&
  //     p.name.includes(searchParams.text || "")
  // );
  const doctors = await getDoctors();
  if (doctors.error) return <h1>Error in get doctors data</h1>;
  // let availableNow: DoctorType[] = [];
  // let notAvailableNow: DoctorType[] = [];
  // data.forEach((doctor) =>
  //   doctor.status ? availableNow.push(doctor) : notAvailableNow.push(doctor)
  // );

  return (
    <div className="content">
      <MainSearch />
      <DiscountBadge />

      <DoctorsView
        title="المتاحين الان"
        description="بامكانك الحجز والتحدث فوراً"
        doctors={doctors.data as RenderedDoctorData[]}
        className="feature"
      />
      {/* {availableNow.length !== 0 && (
        <DoctorsView
          title="المتاحين الان"
          description="بامكانك الحجز والتحدث فوراً"
          data={availableNow}
          className="feature"
        />
      )}
      {notAvailableNow.length !== 0 && (
        <DoctorsView
          title="الغير متاحين الان"
          description="يمكنك الحجز من خلال الجدول الوقت الذي يناسبك"
          data={notAvailableNow}
          className="feature"
        />
      )}
      {availableNow.length === 0 && notAvailableNow.length === 0 && (
        <p className="text-xl my-8 font-extrabold text-center">لا توجد نتائج</p>
      )} */}
      <FAQ />
    </div>
  );
}
