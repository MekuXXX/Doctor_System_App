"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseCouponSchemaType, useCouponSchema } from "@/schemas/useCoupon";
import { Input } from "@/components/ui/input";
import MainButton from "@/components/global/MainButton";

type Props = {};

export function UseCoupon() {
  const form = useForm<UseCouponSchemaType>({
    resolver: zodResolver(useCouponSchema),
    defaultValues: {
      coupon: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: UseCouponSchemaType) => {
    console.log(values);
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
                <Input
                  type="text"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MainButton>تطبيق</MainButton>
      </form>
    </Form>
  );
}
