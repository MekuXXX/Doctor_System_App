"use client";
import React from "react";
import MainButton from "@/components/global/MainButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export default function MainSearch({}: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const form = useForm<SearchDoctorsSchemaType>({
    resolver: zodResolver(searchDoctorsSchema),
  });

  const onSubmit = (data: SearchDoctorsSchemaType) => {
    const parsed = searchDoctorsSchema.safeParse(data);
    if (parsed.success) {
      let search = parsed.data.text ? `text=${parsed.data.text}&` : "";
      search += parsed.data.price ? `price=${parsed.data.price}&` : "";
      search += parsed.data.gender ? `gender=${parsed.data.gender}&` : "";
      if (search) router.push(`${pathName}?${search}`);
      else router.push(pathName!);
    }
  };

  return (
    <div className="bg-[#f1f1f1] dark:bg-dark flex items-center p-2 rounded-md shadow">
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

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    className="border-none focus:ring-0"
                    onChange={field.onChange}
                    placeholder="سعر"
                    type="string"
                    name="سعر"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="gender"
                  >
                    <SelectTrigger id="gender" aria-label="جنس الدكتور">
                      <SelectValue placeholder="جنس" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="MALE">ذكر</SelectItem>
                      <SelectItem value="FEMALE">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <MainButton> ابحث</MainButton>
        </form>
      </Form>
    </div>
  );
}
