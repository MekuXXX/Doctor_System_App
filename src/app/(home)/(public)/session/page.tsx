import React from "react";
import dynamic from "next/dynamic";

const Whereby = dynamic(() => import("@/components/main/EmbeddedWhereby"), {
  ssr: false,
});

type Props = {};

export default function SessionPage({}: Props) {
  return (
    <div>
      <Whereby />
    </div>
  );
}
