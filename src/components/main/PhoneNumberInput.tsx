"use client";
import { useUserData } from "@/hooks/use-user-data";
import React from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Props = {
  value: string;
  onChange: () => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function PhoneNumberInput({
  value,
  onChange,
  disabled = false,
  placeholder = "",
}: Props) {
  const { data, isLoading, isError } = useUserData();

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;

  return (
    <PhoneInput
      international
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      defaultCountry={data?.geoplugin_countryCode as "US"}
      error={
        value
          ? isValidPhoneNumber(value)
            ? undefined
            : "هذا الرقم غير صحيح"
          : "يجب ادخال هذا الحقل"
      }
    />
  );
}
