import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  image: string;
};

export default function SessionPakage({ image }: Props) {
  return (
    <div className="bg-[#2a65ba] rounded-lg p-4 text-white max-w-sm mx-auto">
      <div className="flex justify-around items-center mb-4">
        <div className="rounded-full overflow-hidden w-12 h-12">
          <Image
            alt="User"
            height="48"
            src={image || ""}
            style={{
              aspectRatio: "48/48",
              objectFit: "cover",
            }}
            width="48"
          />
        </div>
        <div className="grid gap-2">
          <h3 className="text-2xl font-semibold"> جلسة نصف ساعة</h3>
          <p className="text-lg">السعر: EGP 1235.92</p>
          <Button className="bg-[#e63946] text-white py-2 px-4 rounded">
            إدفع الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
