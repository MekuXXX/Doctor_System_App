"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { DoctorSessions } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  PackagesSettingsSchemaType,
  packagesSettingsSchema,
} from "@/schemas/doctor-packages";
import { saveDoctorPackages } from "@/actions/doctor-packages";

type Props = {
  email: string;
  user: {
    DoctorData: {
      doctorSessions: DoctorSessions;
    };
  };
  getData: () => any;
};

export function DashDoctorPackages({ user, getData, email }: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const { isError, isLoading, data } = useQuery({
    initialData: user,
    queryKey: ["packages-settings"],
    queryFn: async () => {
      const data = await getData();
      return data;
    },
    refetchInterval: Number(refetchInterval),
  });
  const form = useForm<PackagesSettingsSchemaType>({
    resolver: zodResolver(packagesSettingsSchema),
    defaultValues: {
      halfPackage: String(data.DoctorData.doctorSessions.halfPackage),
      hourPackage: String(data.DoctorData.doctorSessions.hourPackage),
    },
  });

  const onSubmit = async (data: PackagesSettingsSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const parsedData = await packagesSettingsSchema.safeParse(data);
        if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
        else {
          let res = await saveDoctorPackages(email, parsedData.data);
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
    <div className="bg-white dark:bg-dark py-12 px-8 rounded-xl max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="halfPackage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-1 text-sm font-medium leading-none">
                  سعر الأربع جلسات نصف ساعة
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
            name="hourPackage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  className="mb-1 text-sm font-medium leading-none"
                  htmlFor="60-min-duration"
                >
                  سعر الأربع جلسات ساعة
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
