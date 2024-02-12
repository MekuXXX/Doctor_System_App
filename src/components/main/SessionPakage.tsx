import React from "react";
import Image from "next/image";
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
};

export default function SessionPackage({
  image,
  description,
  price,
  id,
  type,
}: Props) {
  return (
    <div className="bg-[#2a65ba] rounded-lg p-4 text-white max-w-sm mx-auto shadow-lg">
      <div className="flex gap-4 items-center my-4 mx-4">
        <div className="rounded-full relative overflow-clip w-16 h-16">
          <Image alt="User" src={image || ""} fill className=" object-cover" />
        </div>
        <div className="grid gap-2">
          <h3 className="text-2xl font-semibold min-w-fit">{description}</h3>
          <CurrencyConvert currency={price} />
          <Link href={`/package-pay?doctorPackageId=${id}&type=${type}`}>
            <Button className="bg-[#e63946] text-white py-2 px-4 rounded">
              إدفع الآن
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
