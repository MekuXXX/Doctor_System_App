"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SendNotificationSchemaType,
  sendNotificationSchema,
} from "@/schemas/sendNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import { sendAdminNotification } from "@/actions/notifications";

type Props = {};

export function SendNotification({}: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<SendNotificationSchemaType>({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      message: "",
      personEmail: undefined,
      type: "" as "all",
    },
  });

  const { watch, resetField } = form;
  const notificationType = watch("type");

  useEffect(() => {
    if (notificationType === "all") resetField("personEmail");
  }, [notificationType, resetField]);

  const onSubmit = async (data: SendNotificationSchemaType) => {
    setError("");
    setSuccess("");
    const parsedData = sendNotificationSchema.safeParse(data);
    if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
    else {
      // TODO: Hit the end point with message
      const res = await sendAdminNotification(parsedData.data);
      if (res.error) setError(res.error);
      else {
        setSuccess(res.success!);
      }
    }
  };
  return (
    <div className="border p-4 rounded-xl bg-white dark:bg-inherit h-full">
      <h2 className="text-xl font-bold mb-8">إرسال اشعارات</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع الاشعار</FormLabel>
                <FormControl>
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="إرسال إلى" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="person">عضو</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {notificationType === "person" && (
            <FormField
              control={form.control}
              name="personEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>حساب المرسل اليه</FormLabel>
                  <FormControl>
                    <Input required {...field} placeholder="أدخل حساب العضو" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رسالة الاشعار</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="أدخل الإشعار" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            إرسال
          </Button>
        </form>
      </Form>
    </div>
  );
}
