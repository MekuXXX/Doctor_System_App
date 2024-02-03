"use client";
import { getDoctorMoney, makeMoneyRequest } from "@/actions/money";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useTransition } from "react";
import MoneyCard from "@/components/dashboard/MoneyCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RequestMoneySchemaType, requestMoneySchema } from "@/schemas/money";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  email: string;
};

export function DoctorMoneyRequest({ email }: Props) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const { isError, isLoading, data } = useQuery({
    queryKey: ["doctor", "money"],
    queryFn: async () => {
      const data = await getDoctorMoney(email);
      if (data.error) throw new Error(data.error);
      return data.data;
    },
    refetchInterval: Number(refetchInterval),
  });

  const form = useForm<RequestMoneySchemaType>({
    resolver: zodResolver(requestMoneySchema),
    defaultValues: {
      money: "1",
    },
  });

  const onSubmit = async (data: RequestMoneySchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const parsedData = requestMoneySchema.safeParse(data);
      if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
      else {
        let res = await makeMoneyRequest(email, parsedData.data);
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          form.reset();
          setSuccess(res.success);
        }
      }
    });
  };

  // TODO: Make loading and error spinner for every page
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MoneyCard
          title="الرصيد الكلى"
          money={data?.pending! + data?.ready!}
          description="يشمل كامل الأرباح لحد الان"
          className="bg-blue-600"
        />

        <MoneyCard
          title="الرصيد المعلق"
          money={data?.pending!}
          description="الأرباح الصادرة من الطلبات الواردة"
          className="bg-red-600"
        />

        <MoneyCard
          title="الرصيد القابل للسحب"
          money={data?.ready!}
          description="المبلغ الصادر من الجلسات التى انهيتها"
          className="bg-green-600"
        />
      </div>
      <div className="mt-12 mb-6 max-w-[20rem] font-bold text-xl bg-white dark:bg-dark py-4 px-6 rounded-xl">
        <h3>ارسال طلب سحب</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="money"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>القيمية</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} max={data?.ready} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <div>
              <Button disabled={isPending} type="submit">
                ارسال
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
