import { SessionType } from "@prisma/client";

export const getDoctorSessionTimeByType = (type: SessionType) => {
  let result = 0;
  if (type === "HOUR") result = 60;
  else if (type === "HALF_HOUR") result = 30;

  return result;
};
