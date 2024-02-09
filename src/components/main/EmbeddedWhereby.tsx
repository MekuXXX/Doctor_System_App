"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@whereby.com/browser-sdk/embed";

type Props = {};

export default function EmbeddedWhereby({}: Props) {
  const searchParams = useSearchParams();
  const id = searchParams?.get("roomId");
  const router = useRouter();
  if (!id) router.push("/");
  return (
    <>
      <whereby-embed room={id!} style={{ height: "90vh" }} />
    </>
  );
}
