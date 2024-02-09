import React from "react";
import DoctorCard from "./DoctorCard";
import { cn } from "@/lib/utils";
import { DoctorData, DoctorRank, User } from "@prisma/client";

export type RenderedDoctorData = {
  DoctorData: {
    doctorActive: {
      isActive: boolean;
      from: string;
      to: string;
    };
    master: {
      name: string;
    };
    Rate: {
      id: string;
      message: string;
      rateValue: number;
      patientName: string;
      doctorId: string;
    }[];
    id: string;
  };
  id: string;
  name: string;
  image: string;
};

type Props = {
  doctors: RenderedDoctorData[];
  title: string;
  description: string;
  className?: string;
  isActive?: boolean;
};

export default function DoctorsView({
  title,
  description,
  doctors,
  className,
  isActive,
}: Props) {
  return (
    <div className={cn("mt-4 mb-8", className)}>
      <h1 className="mt-4 text-2xl mb-4 font-extrabold">{title}</h1>
      <p className=" text-sm -mt-1 mb-8 text">{description}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
        {doctors?.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} isActive={isActive} />
        ))}
      </div>
    </div>
  );
}
