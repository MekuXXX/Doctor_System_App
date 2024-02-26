import React from "react";
import { Button } from "@/components/ui/button";
import CurrencyConvert from "../global/CurrencyConvert";
import { SessionType } from "@prisma/client";
import Link from "next/link";

type Props = {
  id: string;
  type: SessionType;
  image: string;
  description: string;
  price: number;
  doctorId: string;
};

export function FastSession({ description, price, id, type, doctorId }: Props) {
  return (
    <div className="bg-[#2a65ba] rounded-lg p-4 text-white w-[24rem]  mx-auto shadow-lg">
      <div className="p-4 grid place-content-center gap-2">
        <h3 className="text-2xl font-semibold min-w-fit">{description}</h3>
        <CurrencyConvert currency={price} />
        <a
          href={`/fast-pay?doctorPackageId=${id}&type=${type}&doctorId=${doctorId}`}
        >
          <Button className="bg-[#e63946] text-white py-2 px-4 rounded">
            إدفع الآن
          </Button>
        </a>
      </div>
    </div>
  );
}
