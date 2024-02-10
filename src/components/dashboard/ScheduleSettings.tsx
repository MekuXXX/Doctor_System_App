"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ScheduleSettingsSchemaType,
  scheduleSettingsSchema,
} from "@/schemas/schedule";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import { DayOfWeek } from "@prisma/client";

type Props = {};

export default function ScheduleSettings({}: Props) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fieldInitialData = {
    sessionType: "half" as "half",
    sessionTime: "08:00",
    sessionPrice: "20",
  };
  const form = useForm<ScheduleSettingsSchemaType>({
    resolver: zodResolver(scheduleSettingsSchema),
    defaultValues: {
      FRIDAY: [fieldInitialData],
      SATURDAY: [fieldInitialData],
      SUNDAY: [fieldInitialData],
      MONDAY: [fieldInitialData],
      TUESDAY: [fieldInitialData],
      WEDNESDAY: [fieldInitialData],
      THURSDAY: [fieldInitialData],
    },
  });

  const onSubmit = async (values: ScheduleSettingsSchemaType) => {
    await new Promise((res) => setTimeout(res, 4000));
    console.log(values);
  };
  const SectionForm = (title: string, name: DayOfWeek) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: name,
    });

    return (
      <div className="bg-white dark:bg-dark py-6 px-8 rounded-xl border">
        <h3 className="text-2xl font-bold my-4">{title}</h3>
        <div className="grid gap-4">
          {fields.map((field, ind) => {
            return (
              <div className="space-y-4 md:flex gap-4 items-end" key={field.id}>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`${name}.${ind}.sessionType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع الجلسة</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="half">نصف ساعة</SelectItem>
                              <SelectItem value="hour">ساعة</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`${name}.${ind}.sessionTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وقت الجلسة</FormLabel>
                        <FormControl>
                          <Input type="time" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`${name}.${ind}.sessionPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر الجلسة</FormLabel>
                        <FormControl>
                          <Input type="number" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    variant={"destructive"}
                    onClick={() => remove(ind)}
                    className="flex gap-2 items-center"
                  >
                    <span className="text-lg font-semibold md:hidden">
                      حذف الجلسة
                    </span>
                    <MdDelete className="w-[1.25rem] h-[1.25rem]" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-4">
          <Button
            variant={"outline"}
            onClick={() => append(fieldInitialData)}
            className="flex gap-2 items-center"
          >
            <span className="text-lg font-semibold">اضافة جلسة</span>
            <FaPlus className="h-[.75rem] w-[.75rem] font-semibold" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {SectionForm("الجمعه", "FRIDAY")}

          {SectionForm("السبت", "SATURDAY")}

          {SectionForm("الأحد", "SUNDAY")}

          {SectionForm("الاثنين", "MONDAY")}

          {SectionForm("الثلاثاء", "TUESDAY")}

          {SectionForm("الأربعاء", "WEDNESDAY")}

          {SectionForm("الخميس", "THURSDAY")}

          <FormSuccess message={success} />
          <FormError message={error} />
          <div className="flex justify-end gap-4">
            <Button
              disabled={form.formState.isSubmitting}
              onClick={() => form.reset()}
            >
              اعادة التعيين
            </Button>
            <Button disabled={form.formState.isSubmitting} type="submit">
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
