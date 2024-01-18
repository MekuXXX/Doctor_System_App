"use client";
import React, { useEffect } from "react";
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
import {
  FormRangedSchema,
  FormRangedSchemaType,
  FormUnlimitedSchema,
} from "@/schemas/addCoupon";

type Props = {};

export default function AddCoupon({}: Props) {
  const form = useForm<FormRangedSchemaType>({
    resolver: zodResolver(FormRangedSchema),
  });

  const copounType = form.watch("couponType");

  useEffect(() => {
    form.resetField("rangeDate");
  }, [copounType]);

  function onSubmit(data: FormRangedSchemaType) {
    let parsed;
    if (data.rangeDate === undefined)
      parsed = FormUnlimitedSchema.safeParse(data);
    else parsed = FormRangedSchema.safeParse(data);

    console.log(parsed);
  }

  return (
    <div className="content max-w-fit mx-auto border-2 rounded-xl my-8  px-6 py-12 bg-white dark:bg-dark">
      <h1 className="text-2xl mb-8">إضافة كوبون جديد</h1>
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
                    <SelectItem value="permanent">دائم</SelectItem>
                    <SelectItem value="limited">محدد</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {copounType === "limited" && (
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
                      <SelectItem value="value">قيمة</SelectItem>
                      <SelectItem value="percent">نسبة</SelectItem>
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
                <Input type="number" onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" text-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
