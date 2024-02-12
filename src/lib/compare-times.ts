import moment from "moment";

export const isUserOnline = (fromTime: string, toTime: string) => {
  const currentTime = moment();
  const parsedFromTime = moment(currentTime).set({
    hour: moment(fromTime, "HH:mm").hour(),
    minute: moment(fromTime, "HH:mm").minute(),
    second: 0, // Ensure seconds are 0 for accurate comparison
    millisecond: 0, // Ensure milliseconds are 0 for accurate comparison
  });
  const parsedToTime = moment(currentTime).set({
    hour: moment(toTime, "HH:mm").hour(),
    minute: moment(toTime, "HH:mm").minute(),
    second: 59, // Include the last second of the 'to' time
    millisecond: 999, // Include all milliseconds of the 'to' time
  });

  // Handle edge case where 'to' time spans into the next day
  if (parsedToTime.isBefore(parsedFromTime)) {
    parsedToTime.add(1, "day");
  }

  return currentTime.isBetween(parsedFromTime, parsedToTime);
};
