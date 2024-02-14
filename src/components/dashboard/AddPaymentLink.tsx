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
import { FormError } from "@/components/auth/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ADMIN_DASHBOARD, DOCTOR_DASHBOARD } from "@/routes";
import {
  addPaymentLinkSchema,
  AddPaymentLinkSchemaType,
} from "@/schemas/payment-link";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addPaymentLink } from "@/actions/payment-link";

type DoctorType = { name: string; DoctorData: { id: string } | null };

type Props = {
  initialData: DoctorType[];
  getDoctors: () => any;
};

export function AddPaymentLink({ initialData, getDoctors }: Props) {
  const [error, setError] = useState("");
  const router = useRouter();
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const {
    data: doctors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctors", "select"],
    queryFn: async () => {
      const data = await getDoctors();
      if (data.error) throw new Error(data.error);
      return data.data as DoctorType[];
    },
    initialData: initialData,
    refetchInterval: Number(refetchInterval),
  });

  const form = useForm<AddPaymentLinkSchemaType>({
    resolver: zodResolver(addPaymentLinkSchema),
    defaultValues: {
      price: "1",
      customPrice: "1",
      date: "" as unknown as Date,
      doctor: "",
      sessionType: "" as "HOUR",
      time: "",
    },
  });

  async function onSubmit(data: AddPaymentLinkSchemaType) {
    setError("");
    try {
      const parsedData = addPaymentLinkSchema.safeParse(data);
      if (!parsedData.success) setError("خطأ فى بيانات المدخلة");
      else {
        let res = await addPaymentLink(parsedData.data);
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.refresh();
          router.push(`${ADMIN_DASHBOARD}/payment-links`);
        }
      }
    } catch {
      setError("حدث خطأ أثناء انشاء الرابط");
    }
  }
  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="doctor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اختر الطبيب</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {doctors?.map((doctor) => (
                        <SelectItem
                          key={doctor.DoctorData?.id}
                          value={doctor.DoctorData?.id!}
                        >
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sessionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع الجسلة</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"HALF_HOUR"}>نصف ساعة</SelectItem>
                    <SelectItem value={"HOUR"}>ساعة</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>اختر التاريخ</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>وقت الجلسة</FormLabel>
                <Input type="time" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>السعر</FormLabel>
                <Input type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customPrice"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>السعر المخصص</FormLabel>
                <Input type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <div className=" text-center">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              اضافة رابط
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
