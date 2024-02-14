import { DayOfWeek } from "@prisma/client";
import moment from "moment";

export const getWeekDayName = (date: moment.Moment) => {
  return date.format("dddd").toUpperCase();
};

export const convertToAmAndPm = (time: string) => {
  const momentTime = moment(time, "HH:mm");
  return momentTime.format("hh:mm A");
};

export const getNextDayOfWeek = (dayName: DayOfWeek) => {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  // Validate day name
  if (!DayOfWeek[dayName]) {
    throw new Error("Invalid day name");
  }

  // Get today's moment object
  const today = moment();

  // Get the day number (0-6) of the given day name
  const dayNumber = days.indexOf(dayName);

  // Calculate the number of days to add to reach the next day of the week
  const daysToAdd = (dayNumber - today.day() + 7) % 7;

  // Add the calculated days to today's date
  const nextDate = today.add(daysToAdd, "days");

  return nextDate;
};

export const getNotificationDate = () => {
  return moment().format("hh:mm A, Do MMMM YYYY");
};
