"use client";
import React, { useState, useTransition } from "react";
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

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addRateSchema, AddRateSchemaType } from "@/schemas/rate";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRate } from "@/actions/rate";
import { ADMIN_DASHBOARD, USER_DASHBOARD } from "@/routes";
import { changeSessionStatus } from "@/actions/sessions";
import { UserRole } from "@prisma/client";

type Props = {
  doctorId: string;
  patientName: string;
  sessionId: string;
  role: UserRole;
};

export default function AddClientRate({
  doctorId,
  patientName,
  sessionId,
  role,
}: Props) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<AddRateSchemaType>({
    resolver: zodResolver(addRateSchema),
    defaultValues: {
      doctorId: doctorId,
      patientName: patientName,
      message: "",
      rate: "5",
    },
  });
  async function onSubmit(data: AddRateSchemaType) {
    setError("");

    startTransition(async () => {
      try {
        const parsedData = addRateSchema.safeParse(data);
        if (!parsedData.success) toast.error("خطأ فى البيانات المدخلة");
        else {
          let res = await addRate(parsedData.data);
          if (res.error) {
            setError(res.error);
          } else if (res.success) {
            await changeSessionStatus(sessionId, "WAITING");
            toast.success(res.success);
            router.refresh();
            router.push(
              `${role === "USER" ? USER_DASHBOARD : ADMIN_DASHBOARD}/sessions`
            );
          }
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
              <FormControl>
                <Input type="hidden" value={patientName} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" value={doctorId} />
              </FormControl>
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
            اضافة
          </Button>
        </div>
      </form>
    </Form>
  );
}
