import React from "react";
import DoctorCard from "./DoctorCard";
import { cn } from "@/lib/utils";

export type DoctorType = {
  id: number;
  name: string;
  discount: number;
  position: string;
  image: string;
  rate: number;
  priceA: number;
  priceB: number;
  status: boolean;
};

type Props = {
  title: string;
  description: string;
  data: DoctorType[];
  className?: string;
};

export default function DoctorsView({
  title,
  description,
  data,
  className,
}: Props) {
  return (
    <div className={cn("mt-4 mb-8", className)}>
      <h1 className="mt-4 text-2xl mb-4 font-extrabold">{title}</h1>
      <p className=" text-sm -mt-1 mb-8 text">{description}</p>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
        {data.map((doctor) => (
          <DoctorCard key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  );
}
