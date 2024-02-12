"use client";
import { useUserData } from "@/hooks/use-user-data";
import React from "react";

type Props = {
  currency: number;
};

export default function CurrencyConvert({ currency, ...props }: Props) {
  const { data, isLoading, isError } = useUserData();

  // TODO: add loading spinner and error messages
  if (isLoading) return <span>Loading..</span>;
  if (isError) return <span>Error..</span>;
  return (
    <span {...props}>
      <span>{Math.round(currency * data?.geoplugin_currencyConverter!)}</span>{" "}
      <span>{data?.geoplugin_currencyCode}</span>
    </span>
  );
}
