import React from "react";

type Props = {};

export default function DiscountBadge({}: Props) {
  return (
    <div className="breakout relative bg-[#e74c3c] animate-pulse p-4 mt-8 text-center text-white overflow-clip">
      <p className=" before:content-[''] before:w-10 before:h-10 before:border-[0.25rem] before:block before:absolute before:right-2 before:-top-5  after:content-[''] after:block after:w-10 after:h-10 after:absolute after:left-4 after:top-2 after:border-[0.25rem]">
        خصم على جميع الجلسات{" "}
        <span className=" font-extrabold text-lg">قريبا!</span>
      </p>
    </div>
  );
}
