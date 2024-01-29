"use client";
import { GetUserDataType } from "@/actions/set-user-data";
import { FilteredDoctors } from "@/app/layout";
import { useDoctorData } from "@/store/doctors";
import { useUserDataStore } from "@/store/user-data";
import React, { useEffect } from "react";

type Props = {
  data: GetUserDataType;
  doctors: FilteredDoctors;
};

export default function SetUserData({ data, doctors }: Props) {
  const { setUserData, setStatus } = useUserDataStore();
  const { setDoctorData } = useDoctorData();

  useEffect(() => {
    setStatus(data.success);
    setUserData(data.data);
    setDoctorData(doctors);
  }, []);
  return <></>;
}
