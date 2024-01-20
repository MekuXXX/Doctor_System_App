"use client";
import React from "react";
import Link from "next/link";

type Props = {};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100 my-8">
        مشكلة فى تحميل الصفحة
      </h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        للأسف حدثت مشكلة فى تحميل الصفحة يرجى إعادة المحاولة لاحقا
      </p>
      <Link
        className="inline-flex mt-8 items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href={"/"}
      >
        الرجوع للصفحة الرئيسية
      </Link>
      {/* <img
        alt="Lost astronaut floating in space"
        className="mt-8 w-[500px] h-[500px] object-cover rounded-md"
        height="500"
        src="/placeholder.svg"
        style={{
          aspectRatio: "500/500",
          objectFit: "cover",
        }}
        width="500"
      /> */}
    </div>
  );
}
