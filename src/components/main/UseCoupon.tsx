"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseCouponSchemaType, useCouponSchema } from "@/schemas/coupon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FormError } from "@/components/auth/form-error";
import { isCouponExist } from "@/actions/coupon";

type Props = {
  setHasCoupon: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UseCoupon({ setHasCoupon }: Props) {
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const coupon = searchParams?.get("coupon");
  const router = useRouter();
  const form = useForm<UseCouponSchemaType>({
    resolver: zodResolver(useCouponSchema),
    defaultValues: {
      coupon: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: UseCouponSchemaType) => {
    setError("");
    if (coupon === data.coupon) {
      setHasCoupon(false);
      return null;
    }
    try {
      const parsedData = useCouponSchema.safeParse(data);
      if (!parsedData.success) setError("البيانات الذى أدخلتها غير صحيحه");
      else {
        const isCouponValid = await isCouponExist(parsedData.data.coupon);
        if (!isCouponValid) setError("الكوبون الذى أدخلته غير موجود");
        else {
          setHasCoupon(false);
          router.push(
            `${window.location.href}&coupon=${parsedData.data.coupon}`
          );
        }
      }
    } catch {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-1">
        <FormField
          control={form.control}
          name="coupon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الكوبون</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button disabled={form.formState.isSubmitting}>تطبيق</Button>
      </form>
    </Form>
  );
}
