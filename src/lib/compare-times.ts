export const isUserOnline = (fromTime: string, toTime: string) => {
  const from = fromTime.split(":");
  const to = toTime.split(":");
  const currentTime: Date = new Date();
  const parsedFromTime: Date = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    Number(from[0]),
    Number(from[1])
  );
  const parsedToTime: Date = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    Number(to[0]),
    Number(to[1])
  );

  // Compare current time with 'from' and 'to' times
  return currentTime >= parsedFromTime && currentTime <= parsedToTime;
};
