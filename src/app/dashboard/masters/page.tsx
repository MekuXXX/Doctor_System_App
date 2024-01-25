import AddMaster from "@/components/dashboard/AddMaster";
import ViewMasters from "@/components/dashboard/ViewMasters";
import React from "react";

type Props = {};

export default function MastersPage({}: Props) {
  return (
    <div className="content">
      <AddMaster />
      <ViewMasters />
    </div>
  );
}
