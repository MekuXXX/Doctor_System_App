"use client";
import React, { startTransition, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { AddMasterSchemaType, addMasterSchema } from "@/schemas/addMaster";
import { Input } from "@/components/ui/input";
import { addMaster } from "@/actions/master";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import { useRouter } from "next/navigation";

type Props = {};

export default function ViewMasters({}: Props) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddMasterSchemaType>({
    resolver: zodResolver(addMasterSchema),
    defaultValues: {
      masterName: "",
      description: "",
    },
  });

  const onSubmit = async (values: AddMasterSchemaType) => {
    setSuccess("");
    setError("");
    const parsedValues = addMasterSchema.parse(values);

    startTransition(async () => {
      try {
        const res = await addMaster(parsedValues);
        if (res.error) {
          form.reset();
          setError(res.error);
        } else if (res.success) {
          form.reset();
          setSuccess(res.success);
          router.refresh();
        }
      } catch {
        setError("حدث خطأ أثناء انشاء النتخصص");
      }
    });
  };

  return (
    <div className="bg-white dark:bg-dark py-12 px-6 rounded-xl mt-4 border">
      <h3 className="text-xl font-bold mb-6">أضف تخصص جديد</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="masterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوصف</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending}>
            أضف تخصص جديد
          </Button>
        </form>
      </Form>
    </div>
  );
}
