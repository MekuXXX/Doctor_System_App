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
  EditDoctorSchemaType,
  MAX_IMAGE_SIZE,
  addDoctorSchema,
  editDoctorSchema,
} from "@/schemas/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import TextEditor from "../global/TextEditor";
import PhoneNumberInput from "../main/PhoneNumberInput";
import { DoctorData, Master, User, UserRole } from "@prisma/client";
import { FormError } from "../auth/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editDoctor, getDoctorByEmail } from "@/actions/doctor";
import Image from "next/image";
import { CountrySelectInput } from "../global/CountrySelectInput";
import { reset } from "@/actions/reset";
import { FormSuccess } from "../auth/form-success";
import { ADMIN_DASHBOARD } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { getMasters } from "@/actions/master";

type Props = {
  email: string;
  mastersProps: Master[];
  data?: User & {
    DoctorData: DoctorData;
  };
  role: UserRole;
};

export default function EditDoctor({
  email,
  mastersProps,
  data: initialData,
  role,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  const {
    data: masters,
    isLoading: isMasterLoading,
    isError: isMasterError,
  } = useQuery({
    queryKey: ["masters"],
    queryFn: async () => {
      const masters = await getMasters();
      if (masters.error) throw new Error(masters.error);
      return masters.data;
    },
    initialData: mastersProps,
    refetchInterval: Number(refetchInterval),
  });
  const {
    data,
    isError: isDoctorError,
    isLoading: isDoctorLoading,
  } = useQuery({
    queryKey: ["doctor", email],
    queryFn: async () => {
      const doctor = await getDoctorByEmail(email);
      if (doctor.error) throw new Error(doctor.error);
      return doctor.data;
    },
    initialData: initialData,
    refetchInterval: Number(refetchInterval),
  });
  const [imageUrl, setImageUrl] = useState(data?.image as string);
  const router = useRouter();
  const form = useForm<EditDoctorSchemaType>({
    resolver: zodResolver(editDoctorSchema),
    defaultValues: {
      name: data?.name!,
      email: data?.email!,
      gender: data?.gender as "MALE",
      brief: data?.DoctorData?.breif!,
      certificate: data?.DoctorData?.certificate!,
      article: data?.DoctorData?.article!,
      phone: data?.phone!,
      country: data?.DoctorData?.country!,
      master: data?.DoctorData?.masterId!,
      image: imageUrl,
    },
  });

  const onSubmit = async (doctor: EditDoctorSchemaType) => {
    setError("");
    startTransition(async () => {
      try {
        const parsedData = await editDoctorSchema.safeParse(doctor);
        if (!parsedData.success) setError("خطأ فى البيانات المدخلة");
        else {
          const formData = new FormData();
          formData.append("image", parsedData.data.image);
          parsedData.data.image = formData;
          let res = await editDoctor(
            email,
            initialData?.image as string,
            parsedData.data
          );
          if (res.error) {
            setError(res.error);
          } else if (res.success) {
            toast.success(res.success);
            if (role === "ADMIN") {
              console.log("Done");
              router.refresh();
              router.push(`${ADMIN_DASHBOARD}/members`);
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
        const res = await reset({ email: data?.email as string });
        if (res.error) setError(res.error);
        else setSuccess(res.success);
        console.log(res);
      } catch {
        setError("حدث خطأ أثناء ارسال رسالة اعادة التعيين");
      }
    });
  };

  // TODO: add loading spinner and error messages to masters select
  if (isMasterLoading || isDoctorLoading) return <h1>Loading...</h1>;
  if (isMasterError || isDoctorError) return <h1>Error</h1>;

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
