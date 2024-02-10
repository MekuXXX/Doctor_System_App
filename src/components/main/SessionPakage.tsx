import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CurrencyConvert from "../global/CurrencyConvert";

type Props = {
  image: string;
  time?: string;
  price: number;
};

export default function SessionPackage({ image, time, price }: Props) {
  return (
    <div className="bg-[#2a65ba] rounded-lg p-4 text-white max-w-sm mx-auto shadow-lg">
      <div className="flex justify-around items-center mb-4">
        <div className="rounded-full relative overflow-clip w-16 h-16">
          <Image alt="User" src={image || ""} fill className=" object-cover" />
        </div>
        <div className="grid gap-2">
          <h3 className="text-2xl font-semibold"> جلسة {time} ساعة</h3>
          <CurrencyConvert currency={price} />
          <Button className="bg-[#e63946] text-white py-2 px-4 rounded">
            إدفع الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
