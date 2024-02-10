"use client";
import React from "react";
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
import {
  DayOfWeek,
  DoctorScheduleSession,
  Schedule,
  SessionType,
} from "@prisma/client";
import { getDoctorSchedule, saveDoctorSchedule } from "@/actions/schedule";
import { toast } from "sonner";
import { useUserData } from "@/hooks/use-user-data";
import { useQuery } from "@tanstack/react-query";

type Props = {
  userId: string;
  initialData: (Schedule & { sessions: DoctorScheduleSession[] })[];
};

export default function ScheduleSettings({ userId, initialData }: Props) {
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;

  const { data: user, isLoading, isError } = useUserData();
  const {
    data: schedules,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
  } = useQuery({
    queryKey: ["doctor", "schedule"],
    queryFn: async () => {
      const schedules = await getDoctorSchedule(userId);
      if (schedules.error) throw new Error(schedules.error);
      return schedules.data!;
    },
    initialData: initialData,
    refetchInterval: Number(refetchInterval),
  });
  const fieldInitialData = {
    sessionType: "" as "HOUR",
    sessionTime: "",
    sessionPrice: "",
  };

  const defaultValues: any = {};

  for (let schedule of schedules!) {
    defaultValues[schedule.dayOfWeek] = schedule.sessions
      ? schedule.sessions.map((session) => ({
          sessionTime: session.sessionTime,
          sessionPrice: String(session.sessionPrice),
          sessionType: session.sessionType,
        }))
      : fieldInitialData;
  }

  console.log(defaultValues);

  const form = useForm<ScheduleSettingsSchemaType>({
    resolver: zodResolver(scheduleSettingsSchema),
    defaultValues,
  });
  const onSubmit = async (data: ScheduleSettingsSchemaType) => {
    try {
      const parsedData = scheduleSettingsSchema.safeParse(data);
      if (!parsedData.success) toast.error("خطأ فى البيانات المدخلة");
      else {
        const res = await saveDoctorSchedule(
          userId,
          parsedData.data,
          user?.geoplugin_timezone!
        );
        if (res.error) toast.error(res.error);
        else if (res.success) toast.success(res.success);
        else toast.error("حدث مشكلة  أثناء حفظ الجدول");
      }
    } catch {
      toast.error("حدث خطأ أثناء حفظ الجدول");
    }
  };
  2;
  // TODO: add loading spinner and error messages
  if (isLoading || isScheduleLoading) return <h1>Loading..</h1>;
  if (isError || isScheduleError) return <h1>Error..</h1>;

  const SectionForm = React.memo(function SectionForm({
    title,
    name,
  }: {
    title: string;
    name: DayOfWeek;
  }) {
    const { fields, append, remove } = useFieldArray({
      name: name,
      control: form.control,
    });

    return (
      <div className="bg-white dark:bg-dark py-6 px-8 rounded-xl border">
        <h3 className="text-2xl font-bold my-4">{title}</h3>
        <div className="grid gap-4">
          {fields.map((arrayField, ind) => {
            return (
              <div
                className="space-y-4 md:flex gap-4 items-end"
                key={arrayField.id}
              >
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
                              <SelectItem value="HALF_HOUR">
                                نصف ساعة
                              </SelectItem>
                              <SelectItem value="HOUR">ساعة</SelectItem>
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
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <SectionForm title="الجمعه" name="FRIDAY" />
          <SectionForm title="السبت" name="SATURDAY" />
          <SectionForm title="الأحد" name="SUNDAY" />
          <SectionForm title="الاثنين" name="MONDAY" />
          <SectionForm title="الثلاثاء" name="TUESDAY" />
          <SectionForm title="الأربعاء" name="WEDNESDAY" />
          <SectionForm title="الخميس" name="THURSDAY" />

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
