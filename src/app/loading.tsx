import React from "react";
import { DotLoader, MoonLoader } from "react-spinners";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
