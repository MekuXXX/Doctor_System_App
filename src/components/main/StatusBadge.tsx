import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  props?: any[];
};

export function StatusBadge({ children, className, props }: Props) {
  return (
    <span
      className={cn(
        "bg-green-200 text-green-800 py-1 px-2 rounded-xl text-[0.75rem]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
