import React from "react";
import SelectSessionCol from "./SelectSessionCol";
import moment from "moment";
import { getWeekDayName } from "@/lib/moment";
import { db } from "@/lib/db";
import { getScheduleSessionsByDay } from "@/actions/schedule";

const sessionsTimes = [
  {
    id: 1,
    time: "11:00 PM",
    duration: 60,
  },
  {
    id: 2,
    time: "1:00 AM",
    duration: 30,
  },
  {
    id: 3,
    time: "3:00 AM",
    duration: 60,
  },
  {
    id: 4,
    time: "4:00 AM",
    duration: 60,
  },
  {
    id: 5,
    time: "5:00 AM",
    duration: 30,
  },
];

type Props = {
  doctorId: string;
};

export default async function SelectSessions({ doctorId }: Props) {
  const firstDay = moment();
  const secondDay = moment().add(1, "days");
  const thirdDay = moment().add(2, "days");

  const threeDays = [
    {
      day: getWeekDayName(firstDay),
      date: firstDay,
    },
    {
      day: getWeekDayName(secondDay),
      date: secondDay,
    },
    {
      day: getWeekDayName(thirdDay),
      date: thirdDay,
    },
  ];

  const data = await Promise.all(
    threeDays.map((day) =>
      getScheduleSessionsByDay(doctorId, day.day as "FRIDAY")
    )
  );
  return (
    <div className="flex items-start gap-2 justify-center md:justify-start">
      {threeDays.map((day, ind) => (
        <SelectSessionCol
          key={day.day}
          doctorId={doctorId}
          day={day.day as "FRIDAY"}
          date={day.date.format("ddd D/MM")}
          initialDate={data[ind].data!}
        />
      ))}
    </div>
  );
}
