import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const user = await auth();
  if (!user) redirect("/");

  return <>{children}</>;
}
