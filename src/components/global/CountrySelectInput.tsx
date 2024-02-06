"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useCountries } from "@/hooks/use-countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  value: string;
  onChange: (data: string) => void;
  className?: string;
};

export function CountrySelectInput({ value, onChange, className }: Props) {
  const { data: countries, isError, isLoading } = useCountries();

  // TODO: add loading spinner and error message
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countries?.map((country) => (
          <SelectItem
            value={country.translations.ara.official}
            key={country.name.common}
          >
            {country.name.common}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
