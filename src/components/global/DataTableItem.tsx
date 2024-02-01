import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function DataTableItem({ className, children }: Props) {
  return (
    <div className={cn("text-[#c3c4c9] font-thin", className)}>{children}</div>
  );
}
