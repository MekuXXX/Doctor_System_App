"use client";
import React, { useEffect } from "react";
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
  SendAllNotificationSchemaType,
  SendEmNotificationSchemaType,
  sendAllNotificationSchema,
  sendEmNotificationSchema,
} from "@/schemas/sendNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {};

export function SendNotification({}: Props) {
  const form = useForm<SendEmNotificationSchemaType>({
    resolver: zodResolver(sendEmNotificationSchema),
    mode: "onBlur",
  });

  const { watch, resetField } = form;
  const notifType = watch("type");

  useEffect(() => {
    if (notifType === "all") resetField("personEmail");
  }, [notifType, resetField]);

  const onSubmit = (data: SendEmNotificationSchemaType) => {
    let parsed;
    if (data.type === "person") {
      parsed = sendEmNotificationSchema.parse(data);
      toast("أرسل لشخص واحد", {
        description: "الرسالة: " + parsed.message,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
        style: {
          display: "flex",
          justifyContent: "space-between",
        },
      });
    } else {
      parsed = sendAllNotificationSchema.parse(data);
      toast("أرسل لكل الأشخاص", {
        description: "الرساله: " + parsed.message,
        action: {
          label: "الرجوع",
          onClick: () => console.log("Undo"),
        },
        style: {
          display: "flex",
          justifyContent: "space-between",
        },
      });
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
                <FormLabel />
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
          {notifType === "person" && (
            <FormField
              control={form.control}
              name="personEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
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
                <FormLabel />
                <FormControl>
                  <Input {...field} placeholder="أدخل الإشعار" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">إرسال</Button>
        </form>
      </Form>
    </div>
  );
}
