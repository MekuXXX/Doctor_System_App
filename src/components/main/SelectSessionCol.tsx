"use client";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from "next/link";

type Props = {
  times: any;
};

export default function SelectSessionCol({ times }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const first: any = [];
  const collapsed: any = [];

  for (let i = 0; i < times.length; ++i) {
    if (i < 3) first.push(times[i]);
    else collapsed.push(times[i]);
  }

  return (
    <div
      className="max-w-[8.75rem] text-center rounded-lg overflow-hidden bg-red-200"
      dir="ltr"
    >
      <h3 className="bg-main text-lg font-semibold mb-4 py-2 rounded text-white">
        Tue 27/02
      </h3>
      <div className="p-3 grid gap-4 min-w-fit">
        {first.map((session: any) => (
          <Link href={"/checkout"}>
            <div
              key={session.id}
              className="p-2 rounded bg-red-700/50 text-white text-sm min-w-fit"
            >
              <p>{session.time}</p>
              <p>[{session.duration} minutes]</p>
            </div>
          </Link>
        ))}

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <Button className="w-full flex gap-4 bg-red-800/50">
              <h4 className="text-sm font-semibold">المزيد</h4>
              <FaLongArrowAltDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {collapsed.map((session: any) => (
              <Link href={"/checkout"} className=" block">
                <div
                  key={session.id}
                  className="p-2 rounded bg-red-700/50 text-white text-sm min-w-fit"
                >
                  <p className="min-w-fit">{session.time}</p>
                  <p className="min-w-fit">[{session.duration} minutes]</p>
                </div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
