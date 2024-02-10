import moment from "moment";

export const getWeekDayName = (date: moment.Moment) => {
  return date.format("dddd").toUpperCase();
};

export const convertToAmAndPm = (time: string) => {
  const momentTime = moment(time, "HH:mm");
  return momentTime.format("hh:mm A");
};
