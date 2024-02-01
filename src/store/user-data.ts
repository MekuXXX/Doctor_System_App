import { UserDataType } from "@/actions/set-user-data";
import { create } from "zustand";

export interface UserDataStoreType {
  userData?: UserDataType;
  status: boolean;
  setStatus: (status: boolean) => void;
  setUserData: (data: any) => void;
}

export const useUserDataStore = create<UserDataStoreType>((set) => ({
  userData: undefined,
  status: false,
  setUserData: (data) =>
    set((state) => {
      return { ...state, userData: data };
    }),
  setStatus: (status) =>
    set((state) => {
      return { ...state, status: status };
    }),
}));
