"use client";
import React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import * as z from "zod";

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

const FormSchema = z.object({
  couponType: z.enum(["permanent", "limited"]),
  rangeDate: z
    .object({
      from: z
        .date({
          required_error: "A start date is required",
        })
        .min(new Date(), { message: "Current is the minimum date" })
        .default(new Date()),
      to: z
        .date({
          required_error: "A start date is required",
        })
        .min(new Date(), { message: "Current is the minimum date" }),
    })
    .optional(),
  discountType: z.enum(["value", "percent"]),
  discountValue: z
    .string()
    .regex(/^\d+$/, "Type must be a number")
    .transform(Number)
    .refine((n) => n > 0),
  useTimes: z
    .string()
    .regex(/^\d+$/, "Type must be a number")
    .transform(Number)
    .refine((n) => n > 0),
});

type Props = {};

export default function AddCoupon({}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { watch } = form;
  console.log(watch("rangeDate"));
  const copounType = watch("couponType");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast("Summit form", { description: `The date is ${data}` });
    console.log(data);
  }

  return (
    <div className="content max-w-fit mx-auto border-2 rounded-xl my-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="couponType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="limited">Limited</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {copounType === "limited" && (
            <FormField
              control={form.control}
              name="rangeDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Coupon range</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "flex justify-start gap-2 font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <FaCalendarAlt />
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
                            <span>Pick a date</span>
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
        )} */}
          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="value">Value</SelectItem>
                      <SelectItem value="percent">Percent</SelectItem>
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
                <FormLabel>Value</FormLabel>
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
                <FormLabel>Number of use</FormLabel>
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
