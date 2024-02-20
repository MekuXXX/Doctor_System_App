"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  SearchDoctorsSchemaType,
  searchDoctorsSchema,
} from "@/schemas/searchDoctors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

type Props = {};

export default function MainSearch({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SearchDoctorsSchemaType>({
    resolver: zodResolver(searchDoctorsSchema),
    defaultValues: {
      text: searchParams?.get("search") || "",
    },
  });
  const mainUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const onSubmit = (data: SearchDoctorsSchemaType) => {
    if (data.text.length !== 0) {
      router.replace(`${mainUrl}/doctors?search=${data.text}`);
    } else {
      router.replace(`${mainUrl}/doctors`);
    }
  };

  return (
    <div className="flex items-center rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-grow items-center mx-2 gap-4 rounded-md"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    className="flex-grow border-none focus:ring-0"
                    placeholder="بحث"
                    onChange={field.onChange}
                    type="text"
                    name="ابحث عن دكتور"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
