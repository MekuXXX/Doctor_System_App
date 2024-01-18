import React from "react";
import MainButton from "@/components/global/MainButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

export default function MainSearch({}: Props) {
  return (
    <div className="bg-[#f1f1f1] dark:bg-dark flex items-center p-2 rounded-md shadow">
      <div className="flex flex-grow items-center mx-2 gap-4 rounded-md">
        <Input
          className="flex-grow border-none focus:ring-0"
          placeholder="بحث"
          type="text"
          name="ابحث عن دكتور"
        />
        <Select name="gender">
          <SelectTrigger id="gender" aria-label="جنس الدكتور">
            <SelectValue placeholder="جنس" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="male">ذكر</SelectItem>
            <SelectItem value="female">أنثى</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="border-none focus:ring-0"
          placeholder="سعر"
          type="text"
          name="سعر"
        />
      </div>
      <MainButton> ابحث</MainButton>
    </div>
  );
}
