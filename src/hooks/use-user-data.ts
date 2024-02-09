"use client";

import { useQuery } from "@tanstack/react-query";

export interface UserDataType {
  geoplugin_request: string;
  geoplugin_status: number;
  geoplugin_delay: string;
  geoplugin_credit: string;
  geoplugin_city: string;
  geoplugin_region: string;
  geoplugin_regionCode: string;
  geoplugin_regionName: string;
  geoplugin_areaCode: string;
  geoplugin_dmaCode: string;
  geoplugin_countryCode: string;
  geoplugin_countryName: string;
  geoplugin_inEU: number;
  geoplugin_euVATrate: boolean;
  geoplugin_continentCode: string;
  geoplugin_continentName: string;
  geoplugin_latitude: string;
  geoplugin_longitude: string;
  geoplugin_locationAccuracyRadius: string;
  geoplugin_timezone: string;
  geoplugin_currencyCode: string;
  geoplugin_currencySymbol: string;
  geoplugin_currencySymbol_UTF8: string;
  geoplugin_currencyConverter: number;
}

export const useUserData = () => {
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await fetch("http://www.geoplugin.net/json.gp");
      const data = await res.json();
      return data as UserDataType;
    },
    refetchInterval: Number(refetchInterval),
  });
};
