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
  return (
    <PhoneInput
      international
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      defaultCountry="US"
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
