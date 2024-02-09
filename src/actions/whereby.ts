"use server";
const API_KEY = process.env.WHEREBY_API_KEY;

export type RoomData = {
  meetingId: string;
  startDate: string;
  endDate: string;
  roomUrl: string;
  hostRoomUrl: string;
};
export const createWherebyUrl = async () => {
  const data = {
    endDate: "2099-02-18T14:23:00.000Z",
    fields: ["hostRoomUrl"],
  };
  const res = await fetch("https://api.whereby.dev/v1/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const roomData = await res.json();
  return roomData as RoomData;
};
