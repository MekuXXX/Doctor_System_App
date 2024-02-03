"use client";
import React from "react";
import Link from "next/link";
import MainButton from "@/components/global/MainButton";

type Props = {};

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100 my-8">
        مشكلة فى تحميل الصفحة
      </h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        للأسف حدثت مشكلة فى تحميل الصفحة يرجى إعادة المحاولة لاحقا
      </p>
      <Link href={"/"}>
        <MainButton className="my-4">الرجوع للصفحة الرئيسية</MainButton>
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
