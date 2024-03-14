import { auth } from "@/auth";
import AddClientRate from "@/components/main/AddClientRate";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    sessionId: string;
  };
};

export default async function AddRate({ searchParams }: Props) {
  const session = await auth();
  if (!session) redirect("/");

  if (session.user.role === "DOCTOR") redirect("/");

  const { sessionId } = searchParams;
  if (!sessionId) redirect("/");

  const sessionData = await db.session.findUnique({
    where: { id: sessionId, status: "RESERVED" },
    select: { doctor: { select: { id: true } }, userId: true },
  });
  if (!sessionData) redirect("/");

  if (session.user.role === "USER") {
    if (session.user.id !== sessionData.userId) redirect("/");
  }

  return (
    <div className="content max-w-fit mx-auto border-2 rounded-xl my-8  px-6 py-12">
      <h1 className="text-2xl mb-8">إضافة تقييم جديد</h1>
      <AddClientRate
        patientName={session.user.name!}
        doctorId={sessionData.doctor.id}
        sessionId={sessionId}
        role={session.user.role}
      />
    </div>
  );
}
