import React from "react";
import { Button } from "@/components/ui/button";
import CurrencyConvert from "../global/CurrencyConvert";
import { SessionType } from "@prisma/client";

type Props = {
  id: string;
  type: SessionType;
  image: string;
  description: string;
  price: number;
};

export default function SessionPackage({
  description,
  price,
  id,
  type,
}: Props) {
  return (
    <div className="bg-[#2a65ba] rounded-lg p-4 text-white max-w-sm mx-auto shadow-lg">
      <div className="p-2 grid place-content-center gap-2">
        <h3 className="text-2xl font-semibold min-w-fit">{description}</h3>
        <CurrencyConvert currency={price} />
        <a href={`/package-pay?doctorPackageId=${id}&type=${type}`}>
          <Button className="bg-[#e63946] text-white py-2 px-4 rounded">
            إدفع الآن
          </Button>
        </a>
      </div>
    </div>
  );
}
