import { DoctorRank } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type Doctor = {
  DoctorData: {
    doctorRank: DoctorRank;
  };
};
export const sortDoctorByRank = (doctor_1: Doctor, doctor_2: Doctor) => {
  const rankMap = {
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
    PLATINIUM: 4,
  };

  const rank1 = rankMap[doctor_1?.DoctorData?.doctorRank as "BRONZE"];
  const rank2 = rankMap[doctor_2?.DoctorData?.doctorRank as "BRONZE"];

  // Sort doctors in descending order (highest rank first)
  return rank2 - rank1;
};
