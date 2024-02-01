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

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: {
      cat: {
        official: string;
        common: string;
      };
    };
  };
};
export function CountrySelectInput({ value, onChange, className }: Props) {
  const { data: countries } = useCountries();

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countries?.map((country) => (
          <SelectItem value={country.name.common} key={country.name.common}>
            {country.name.common}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
