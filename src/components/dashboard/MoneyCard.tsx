import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  money: number;
  description: string;
  className?: string;
};

export default function MoneyCard({
  title,
  money,
  description,
  className,
}: Props) {
  return (
    <div
      className={cn("py-4 px-2 rounded-lg text-center text-white", className)}
    >
      <p>{title}</p>
      <h3 className="text-2xl font-extrabold">{money}$</h3>
      <p>{description}</p>
    </div>
  );
}
