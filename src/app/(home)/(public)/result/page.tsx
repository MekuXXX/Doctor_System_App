import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: { status: string; message?: string };
};

export default function PaymentResultPage({
  searchParams: { status, message },
}: Props) {
  return (
    <div className="content min-h-[70vh]">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          {status === "success" ? (
            <div className="grid gap-6">
              <svg
                className="h-24 w-24 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h2 className="text-2xl font-semibold">نجحت عملية الشراء</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                شكرا لك لشراء هذه الخدمة
              </p>
              <Link href={"/"}>
                <Button className="font-semibold mt-2">
                  العوده للقائمة الرئيسية
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="flex justify-center mt-4">
                <svg
                  className="h-12 w-12 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 2 1.88 1.88" />
                  <path d="M14.12 3.88 16 2" />
                  <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
                  <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
                  <path d="M12 20v-9" />
                  <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
                  <path d="M6 13H2" />
                  <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
                  <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
                  <path d="M22 13h-4" />
                  <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
                </svg>
              </div>
              <div className="px-4 py-2 -mt-3">
                <h1 className="font-bold text-center text-3xl">
                  خطأ فى علمية الشراء
                </h1>{" "}
                {message && (
                  <p className="mt-2 text-gray-600 text-sm text-center">
                    {message}
                  </p>
                )}
                <p className="mt-2 text-gray-600 text-sm text-center">
                  نحن نتأسف لم تتم عملية الشراء بنجاح برجاء اعادة المحاوله
                </p>
              </div>
              <div className="flex justify-center mb-4">
                <Link href={"/"}>
                  <Button className="font-semibold mt-2">
                    العوده للقائمة الرئيسية
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
