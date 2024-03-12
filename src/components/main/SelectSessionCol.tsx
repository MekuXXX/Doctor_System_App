"use client";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from "next/link";
import { DayOfWeek, DoctorScheduleSession, Session } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getScheduleSessionsByDay } from "@/actions/schedule";
import { getDoctorSessionTimeByType } from "@/lib/doctor-session";
import { convertToAmAndPm } from "@/lib/moment";
import { isSessionBought } from "@/actions/doctor";

type Props = {
  doctorId: string;
  day: DayOfWeek;
  date: string;
  initialDate: DoctorScheduleSession[];
};

export default function SelectSessionCol({
  doctorId,
  day,
  date,
  initialDate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const {
    data: times,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions", day, doctorId],
    queryFn: async () => {
      const data = await getScheduleSessionsByDay(doctorId, day);
      if (data.error) throw new Error(data.error);
      return data.data;
    },
    initialData: initialDate,
    // refetchInterval: Number(refetchInterval),
  });

  const first = [];
  const collapsed = [];

  for (let i = 0; i < times?.length!; ++i) {
    if (i < 3) first.push(times?.[i]);
    else collapsed.push(times?.[i]);
  }

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;

  return (
    <div
      className="max-w-[8.75rem] text-center rounded-lg overflow-hidden bg-red-200"
      dir="ltr"
    >
      <h3 className="bg-main text-lg font-semibold mb-4 py-2 rounded text-white">
        {date}
      </h3>
      <div className="p-3 grid gap-4 min-w-fit">
        {first.map((session) => (
          <a href={`/session-pay?sessionId=${session?.id}`} key={session?.id}>
            <div className="p-2 rounded bg-red-700/50 text-white text-sm min-w-fit">
              <p>{convertToAmAndPm(session?.sessionTime!)}</p>
              <p>
                [{session?.sessionType === "HALF_HOUR" ? "30" : "60"} minutes]
              </p>
            </div>
          </a>
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
            {collapsed.map((session) => (
              <a
                href={`/session-pay?sessionId=${session?.id}`}
                key={session?.id}
              >
                <div className="p-2 rounded bg-red-700/50 text-white text-sm min-w-fit">
                  <p>{convertToAmAndPm(session?.sessionTime!)}</p>
                  <p>
                    [{getDoctorSessionTimeByType(session?.sessionType!)}{" "}
                    minutes]
                  </p>
                </div>
              </a>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
