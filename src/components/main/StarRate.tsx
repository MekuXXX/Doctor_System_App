import { cn } from "@/lib/utils";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

type Props = {
  rate: number;
  className?: string;
};

export default function StarRate({ rate, className }: Props) {
  return (
    <div className={cn("flex gap-2 py-2", className)}>
      {Array.from("1".repeat(5)).map((_, ind) => {
        if (rate >= ind + 1)
          return <FaStar className=" fill-yellow-700" key={ind} />;
        return <FaRegStar className="text-yellow-700" key={ind} />;
      })}
    </div>
  );
}
