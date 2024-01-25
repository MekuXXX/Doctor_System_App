"use client";
import { GetUserDataType } from "@/actions/set-user-data";
import { useUserDataStore } from "@/store/user-data";
import React, { useEffect } from "react";

type Props = {
  data: GetUserDataType;
};

export default function SetUserData({ data }: Props) {
  const { setUserData, setStatus } = useUserDataStore();

  useEffect(() => {
    setStatus(data.success);
    setUserData(data.data);
  }, []);
  return <></>;
}
