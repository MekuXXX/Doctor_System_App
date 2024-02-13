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
  EditUserSchemaType,
  MAX_IMAGE_SIZE,
  editDoctorSchema,
  editUserSchema,
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
import { Button } from "../ui/button";
import PhoneNumberInput from "../main/PhoneNumberInput";
import { User, UserRole } from "@prisma/client";
import { FormError } from "../auth/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editUser, getUserById } from "@/actions/doctor";
import Image from "next/image";
import { reset } from "@/actions/reset";
import { FormSuccess } from "../auth/form-success";
import { ADMIN_DASHBOARD } from "@/routes";
import { DEFAULT_IMG } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

type Props = {
  user: User;
  email: string;
  role: UserRole;
};

export default function EditUser({ user: initialData, email, role }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const router = useRouter();
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const { data: user } = useQuery({
    queryKey: ["user", initialData.email],
    queryFn: async () => {
      const user = await getUserById(email);
      if (user.error) throw new Error(user.error);
      return user.data;
    },
    refetchInterval: Number(refetchInterval),
    initialData: initialData,
  });
  const [imageUrl, setImageUrl] = useState(user?.image || DEFAULT_IMG);
  const form = useForm<EditUserSchemaType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name!,
      email: user?.email!,
      gender: user?.gender,
      phone: user?.phone || "",
      image: imageUrl,
    },
  });

  const onSubmit = async (data: EditUserSchemaType) => {
    setError("");
    startTransition(async () => {
      try {
        const parsedData = await editUserSchema.safeParse(data);
        if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
        else {
          const formData = new FormData();
          formData.append("image", parsedData.data.image);
          parsedData.data.image = formData;
          let res = await editUser(
            user?.id!,
            user?.image as string,
            parsedData.data
          );
          if (res.error) {
            setError(res.error);
          } else if (res.success) {
            form.reset();
            toast.success(res.success);

            if (role === "ADMIN") {
              router.refresh();
              router.push(`${ADMIN_DASHBOARD}/members?role=USER`);
            }
          }
        }
      } catch {
        setError("حدث خطأ برجاء اعادة المحاولة");
      }
    });
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const res = await reset({ email: user?.email as string });
        if (res.error) setError(res.error);
        else setSuccess(res.success);
      } catch {
        setError("حدث خطأ أثناء ارسال رسالة اعادة التعيين");
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
                      src={imageUrl}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم الطبيب</FormLabel>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="MALE">ذكر</SelectItem>
                      <SelectItem value="FEMALE">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
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

          <FormSuccess message={success} />
          <FormError message={error} />
          <div>
            <Button disabled={isPending} className="w-full">
              تعديل{" "}
            </Button>
          </div>
        </form>
      </Form>
      <Button
        variant={"outline"}
        className="w-full mt-2"
        disabled={isPending}
        onClick={handleChangePassword}
      >
        اعادة تعيين كلمة المرور
      </Button>
    </div>
  );
}
