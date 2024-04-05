"use client";

import { getUserLocation } from "@/actions/user-data";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const ipRes = await fetch(process.env.NEXT_PUBLIC_IPIFY_URL || "");
      const ip = await ipRes.text();
      const data = await getUserLocation(ip);
      console.log(data);
      return data;
    },
    // refetchInterval: Number(refetchInterval),
  });
};
