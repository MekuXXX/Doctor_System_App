import React from "react";
import { data } from "@/app/(home)/page";
import DoctorsView, { DoctorType } from "@/components/main/DoctorsView";

type Props = {};

export default function DoctorsPage({}: Props) {
  let availableNow: DoctorType[] = [];
  let notAvailableNow: DoctorType[] = [];
  data.forEach((doctor) =>
    doctor.status ? availableNow.push(doctor) : notAvailableNow.push(doctor)
  );

  return (
    <div className="content">
      {availableNow.length !== 0 && (
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
        <h1 className="text-xl my-8 font-extrabold text-center">
          لا توجد نتائج
        </h1>
      )}
    </div>
  );
}
