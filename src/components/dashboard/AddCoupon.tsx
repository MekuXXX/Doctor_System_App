"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FaCalendarAlt } from "react-icons/fa";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { addCouponSchema, AddCouponSchemaType } from "@/schemas/addCoupon";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { addCoupon } from "@/actions/coupon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ADMIN_DASHBOARD } from "@/lib/constants";

type Props = {};

export default function AddCoupon({}: Props) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<AddCouponSchemaType>({
    resolver: zodResolver(addCouponSchema),
  });

  const { watch, resetField } = form;

  const couponType = watch("couponType");

  useEffect(() => {
    resetField("rangeDate");
  }, [couponType, resetField]);

  async function onSubmit(data: AddCouponSchemaType) {
    setError("");
    startTransition(async () => {
      try {
        const res = await addCoupon(data);
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.refresh();
          router.push(`/${ADMIN_DASHBOARD}/coupons`);
        }
      } catch {
        setError("حدث خطأ أثناء انشاء النتخصص");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="couponType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الكوبون</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PERMANENT">دائم</SelectItem>
                  <SelectItem value="LIMITED">محدد</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {couponType === "LIMITED" && (
          <FormField
            control={form.control}
            name="rangeDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>المده الزمنية</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "gap-4 items-center justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <FaCalendarAlt className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>اختر التابريخ</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع العرض</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="VALUE">قيمة</SelectItem>
                    <SelectItem value="PERCENT">نسبة</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountValue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>القيمة أو النسبة</FormLabel>
              <Input type="number" onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="useTimes"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>عدد مرات الإستخدام</FormLabel>
              <Input type="text" onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <div className=" text-center">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
