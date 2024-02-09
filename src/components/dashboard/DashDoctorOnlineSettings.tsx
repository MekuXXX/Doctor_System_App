"use client";
import React, { use, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  OnlineSettingSchemaType,
  onlineSettingSchema,
} from "@/schemas/online-settions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { saveOnlineSettings } from "@/actions/online-settings";
import { DoctorActive, DoctorData, DoctorSessions, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type Props = {
  user: User & {
    DoctorData: DoctorData & {
      doctorSessions: DoctorSessions;
      doctorActive: DoctorActive;
    };
  };
  getData: () => any;
};

export default function DashDoctorOnlineSettings({ user, getData }: Props) {
  const [checked, setChecked] = useState(user.DoctorData.doctorActive.isActive);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const { isError, isLoading, data } = useQuery({
    initialData: user,
    queryKey: ["online-settings"],
    queryFn: async () => {
      const data = await getData();
      return data;
    },
    refetchInterval: Number(refetchInterval),
  });
  const form = useForm<OnlineSettingSchemaType>({
    resolver: zodResolver(onlineSettingSchema),
    defaultValues: {
      from: user.DoctorData.doctorActive.from,
      to: user.DoctorData.doctorActive.to,
      halfSession: String(data.DoctorData.doctorSessions.halfSessions),
      hourSession: String(data.DoctorData.doctorSessions.hourSessions),
    },
  });

  const onSubmit = async (data: OnlineSettingSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const parsedData = await onlineSettingSchema.safeParse(data);
        if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
        else {
          let res = await saveOnlineSettings(
            user.email!,
            checked,
            parsedData.data
          );
          if (res.error) {
            setError(res.error);
          } else if (res.success) {
            setSuccess(res.success);
          }
        }
      } catch {
        setError("حدث خطأ برجاء اعادة المحاولة");
      }
    });
  };

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;

  return (
    <div className="bg-white dark:bg-dark py-12 px-8 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Checkbox
          id="enable-notifications"
          onClick={() => setChecked(!checked)}
          checked={checked}
        />
        <label
          className="ml-2 text-sm font-medium leading-none"
          htmlFor="enable-notifications"
        >
          تفعيل كمتصل
        </label>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="md:flex items-center gap-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="mb-1 text-sm font-medium leading-none"
                    htmlFor="start-time"
                  >
                    من
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      id="start-time"
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="mb-1 text-sm font-medium leading-none"
                    htmlFor="end-time"
                  >
                    الى
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      id="end-time"
                      type="time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex gap-4 items-center">
            <FormField
              control={form.control}
              name="halfSession"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="mb-1 text-sm font-medium leading-none"
                    htmlFor="30-min-duration"
                  >
                    سعر الجلسة الفورية لمدة 30 دقيقة
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="number"
                      id="30-min-duration"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hourSession"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="mb-1 text-sm font-medium leading-none"
                    htmlFor="60-min-duration"
                  >
                    سعر الجلسة الفورية لمدة 60 دقيقة
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      id="60-min-duration"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <div>
            <Button disabled={isPending} className="w-full">
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
