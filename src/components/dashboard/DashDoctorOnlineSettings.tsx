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
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { saveOnlineSettings } from "@/actions/online-settings";
import { useRouter } from "next/navigation";
import { DoctorActive, DoctorData, DoctorSessions, User } from "@prisma/client";

type Props = {
  user: User & {
    DoctorData: DoctorData & {
      doctorSessions: DoctorSessions;
      doctorActive: DoctorActive;
    };
  };
};

export default function DashDoctorOnlineSettings({ user }: Props) {
  const [checked, setChecked] = useState(user.DoctorData.doctorActive.isActive);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<OnlineSettingSchemaType>({
    resolver: zodResolver(onlineSettingSchema),
    defaultValues: {
      from: user.DoctorData.doctorActive.from,
      to: user.DoctorData.doctorActive.to,
      halfSession: String(user.DoctorData.doctorSessions.halfSessions),
      hourSession: String(user.DoctorData.doctorSessions.hourSessions),
      twoSessions: String(user.DoctorData.doctorSessions.twoSessions),
      fourSessions: String(user.DoctorData.doctorSessions.fourSessions),
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
            form.reset();
            setSuccess(res.success);
          }
        }
      } catch {
        setError("حدث خطأ برجاء اعادة المحاولة");
      }
    });
  };

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
          <div className="md:flex gap-4 items-center">
            <FormField
              control={form.control}
              name="twoSessions"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-1 text-sm font-medium leading-none">
                    سعر الجلساتين
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fourSessions"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="mb-1 text-sm font-medium leading-none"
                    htmlFor="60-min-duration"
                  >
                    سعر الأربع جلسات
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" type="number" />
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
