import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function MainButton({ children, className }: Props) {
  return (
    <Button
      className={cn(
        "mr-auto bg-main text-white hover:text-main hover:bg-transparent transition border border-main",
        className
      )}
    >
      {children}
    </Button>
  );
}
