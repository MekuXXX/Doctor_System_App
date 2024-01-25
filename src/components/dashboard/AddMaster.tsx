"use client";
import React from "react";
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
type Props = {};

export default function ViewMasters({}: Props) {
  const form = useForm<AddMasterSchemaType>({
    resolver: zodResolver(addMasterSchema),
    defaultValues: {
      masterName: "",
      description: "",
    },
  });

  const onSubmit = (values: AddMasterSchemaType) => {};

  return (
    <div>
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
          <Button type="submit">أضف تخصص جديد</Button>
        </form>
      </Form>
    </div>
  );
}
