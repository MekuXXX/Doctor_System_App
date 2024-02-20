import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async function myRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  const detectedIp = requestIp.getClientIp(req);
  console.log(detectedIp);

  res.send("Done");
}
