"use client";
import React from "react";
import { PaymentData } from "@/components/main/CheckoutForm";
import { buySessionByPackages, isHavePackageToBuy } from "@/actions/doctor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  session: PaymentData;
  isUsePackage: boolean;
};

export function PackagePay({ session, isUsePackage }: Props) {
  const router = useRouter();
  if (!isUsePackage) return <></>;

  const handleSubmit = async () => {
    const res = await buySessionByPackages(session);
    if (res.error) router.replace(`/result?status=failed&message=${res.error}`);
    else router.push(`/result?status=success&message=${res.success}`);
  };

  return (
    <form action={handleSubmit}>
      <Button variant={"link"} className=" text-main block ps-0" type="submit">
        شراء بالبكجات
      </Button>
    </form>
  );
}
