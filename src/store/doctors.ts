import { FilteredDoctors } from "@/app/layout";
import { create } from "zustand";

export interface UserDataStoreType {
  doctors?: FilteredDoctors;
  setDoctorData: (data?: FilteredDoctors) => void;
}

export const useDoctorData = create<UserDataStoreType>((set) => ({
  doctors: undefined,
  setDoctorData: (data) =>
    set((state) => {
      return { ...state, doctors: data };
    }),
}));
