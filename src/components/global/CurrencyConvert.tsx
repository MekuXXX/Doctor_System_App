"use client";
import { useUserData } from "@/hooks/use-user-data";
import React from "react";

type Props = {
  currency: number;
};

export default function CurrencyConvert({ currency, ...props }: Props) {
  const { data, isLoading, isError } = useUserData();

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;
  return (
    <p {...props}>
      <span>{currency * data?.geoplugin_currencyConverter!}</span>{" "}
      <span>{data?.geoplugin_currencyCode}</span>
    </p>
  );
}
