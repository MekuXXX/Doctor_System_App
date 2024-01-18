import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  return (
    <div>
      <h1 className="text-2xl">Doctor with id {id}</h1>
    </div>
  );
}
