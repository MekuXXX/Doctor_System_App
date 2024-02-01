"use client";
import React, { useState, useTransition } from "react";
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
  ACCEPTED_IMAGE_TYPES,
  AddDoctorSchemaType,
  MAX_IMAGE_SIZE,
  addDoctorSchema,
} from "@/schemas/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import TextEditor from "../global/TextEditor";
import PhoneNumberInput from "../main/PhoneNumberInput";
import { Master } from "@prisma/client";
import { FormError } from "../auth/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addDoctor } from "@/actions/doctor";
import Image from "next/image";
import { CountrySelectInput } from "../global/CountrySelectInput";

type Props = {
  masters: Master[];
};

export default function AddDoctor({ masters }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const form = useForm<AddDoctorSchemaType>({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      gender: "male",
      brief: "",
      certificate: "",
      article: "",
      phone: "",
      country: "",
      master: "",
      image: "/images/default.jpg",
      password: "",
    },
  });

  const onSubmit = async (data: AddDoctorSchemaType) => {
    setError("");
    startTransition(async () => {
      try {
        const parsedData = await addDoctorSchema.safeParse(data);
        if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
        else {
          const formData = new FormData();
          formData.append("image", parsedData.data.image);
          parsedData.data.image = formData;

          let res = await addDoctor(parsedData.data);
          if (res.error) {
            setError(res.error);
          } else if (res.success) {
            form.reset();
            toast.success(res.success);
            router.refresh();
            router.push("/dashboard/members?role=DOCTOR");
          }
        }
      } catch {
        setError("حدث خطأ برجاء اعادة المحاولة");
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-fit mx-auto">
                <FormLabel htmlFor="profile-picture-input">
                  <div className="w-24 h-24 relative rounded-full overflow-clip cursor-pointer mx-auto">
                    <Image
                      src={imageUrl || "/images/default.jpg"}
                      alt="avatar image"
                      fill
                      sizes={"6rem"}
                      className="object-cover"
                    />
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    className="hidden"
                    id="profile-picture-input"
                    type="file"
                    onChange={({ target }) => {
                      if (!target.files) return;
                      const file = target.files[0];

                      field.onChange(file);
                      if (
                        file.size <= MAX_IMAGE_SIZE &&
                        ACCEPTED_IMAGE_TYPES.includes(file.type)
                      ) {
                        setImageUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الأول</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الأخير</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم اللطيف</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>حساب الطبيب</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>النوع</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="male">ذكر</SelectItem>
                      <SelectItem value="female">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="master"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تخصص الطبيب</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {masters?.map((master) => (
                      <SelectItem value={master.id} key={master.id}>
                        {master.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brief"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نبذة الطبيب</FormLabel>
                <FormControl>
                  <TextEditor onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شهادات الطبيب</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مقال الطبيب</FormLabel>
                <FormControl>
                  <TextEditor onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البلد</FormLabel>
                <FormControl>
                  <CountrySelectInput
                    onChange={field.onChange}
                    value={field.value}
                  />
                  {/* <Input {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <div>
            <Button disabled={isPending} className="w-full">
              اضافة
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
