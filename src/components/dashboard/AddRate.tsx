"use client";
import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addRateSchema, AddRateSchemaType } from "@/schemas/rate";
import { Textarea } from "@/components/ui/textarea";
import { FaStar } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoctorData } from "@/store/doctors";
import { addRate, editRate } from "@/actions/rate";
import { Rate } from "@prisma/client";
type Props = {
  propsData?: Rate;
};

export function AddRate({ propsData }: Props) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { doctors } = useDoctorData();
  const form = useForm<AddRateSchemaType>({
    resolver: zodResolver(addRateSchema),
    defaultValues: {
      doctorId: propsData?.doctorId || "",
      message: propsData?.message || "",
      patientName: propsData?.patientName || "",
      rate: (String(propsData?.rateValue) as "1") || "5",
    },
  });
  async function onSubmit(data: AddRateSchemaType) {
    setError("");

    startTransition(async () => {
      try {
        let res;
        if (propsData) {
          propsData = {
            id: propsData.id,
            patientName: data.patientName,
            doctorId: data.doctorId,
            message: data.message,
            rateValue: Number(data.rate),
          };

          res = await editRate(propsData);
        } else {
          res = await addRate(data);
        }
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.refresh();
          router.push("/dashboard/rates");
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
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المريض</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الطبيب</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {doctors?.map((doctor) => (
                    <SelectItem value={doctor.id} key={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رسالة التقييم</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>التقييم</FormLabel>
              <Input type="number" {...field} max={5} min={1} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <div className=" text-center">
          <Button type="submit" disabled={isPending}>
            {propsData ? "تعديل" : "اضافة"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
