import React from "react";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainButton from "@/components/global/MainButton";
import StarRate from "@/components/main/StarRate";
import { FaWhatsapp } from "react-icons/fa";
import SelectSessions from "@/components/main/SelectSessions";
import SessionPackage from "@/components/main/SessionPakage";
import ChangeTimezone from "@/components/main/ChangeTimezone";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { calculateRate } from "@/lib/rate";

type Props = {
  params: {
    id: string;
  };
};

export default async function DoctorDataPage({ params: { id } }: Props) {
  if (!id) redirect("/");
  const doctor = await db.doctorData.findUnique({
    where: { id },
    select: {
      id: true,
      article: true,
      breif: true,
      country: true,
      Rate: true,
      doctorRank: true,
      certificate: true,
      doctorActive: {
        select: { isActive: true, from: true, to: true },
      },
      master: { select: { name: true } },
      doctor: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      doctorSessions: true,
    },
  });
  if (!doctor) redirect("/");
  const rate = calculateRate(doctor.Rate);

  return (
    <div className="content">
      <div className="feature mx-auto grid md:grid-cols-2 gap-4 items-start">
        <div className="grid gap-8 p-4 ">
          <Card className="min-w-fit px-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {doctor?.doctor?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="w-[200px] h-[200px] relative">
                <Image
                  src={doctor.doctor?.image}
                  alt={`Dr.${doctor.doctor?.name}`}
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-600">{doctor.master?.name}</p>
                <p className="text-sm font-medium text-yellow-400 flex items-center">
                  تقييم {rate}
                </p>
              </div>
            </CardContent>
            <CardFooter className="text-right">
              <p className="text-sm text-gray-600">{doctor.country}</p>
            </CardFooter>
          </Card>

          {/* <Card className="w-fit px-4 py-2">
            <CardContent className="flex items-center gap-4">
              <div className="w-[150px] h-[150px] relative">
                <Image
                  src={doctorData?.image || ""}
                  alt={`Dr.${doctorData?.name}`}
                  objectFit="cover"
                  fill
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <CardTitle className="text-lg font-semibold">
                  {doctorData?.name}
                </CardTitle>
                <p className="text-sm text-gray-600 min-w-fit">
                  {doctorData?.position}
                </p>
                <p className="text-sm font-medium text-yellow-400 flex items-center min-w-fit">
                  تقييم {doctorData?.rate}
                </p>
                <p className="text-sm text-gray-600">الروابط:</p>
                <p className="text-lg font-semibold mt-2">الد ولة</p>
                <p className="text-sm text-gray-600">
                  المملكة العربية السعودية
                </p>
              </div>
            </CardContent>
          </Card> */}
          <div className="space-y-2">
            <SessionPackage
              image={doctor.doctor?.image || ""}
              time="نصف"
              price={doctor?.doctorSessions?.halfSessions!}
            />

            <SessionPackage
              image={doctor.doctor?.image || ""}
              time="نصف"
              price={doctor?.doctorSessions?.hourSessions!}
            />

            {/* <SessionPackage image={doctorData?.image || ""} price="1249.99" /> */}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-main my-3">
              المواعيد المتاحه
            </h2>
            <div className="py-3 px-5 rounded-lg flex gap-4 items-center bg-main text-white">
              <p>
                إن لم تجد موعدًا يُلائمك، وتفضل الحصول على موعد خاص، الرجاء
                التواصل معنا عبر الوتساب
              </p>
              <Button className="bg-[#25D366] py-2 px-4 rounded hover:bg-[#38b064] flex gap-2">
                <FaWhatsapp className="w-4 h-4" />
                <span>واتساب</span>
              </Button>
            </div>
          </div>
          <ChangeTimezone />
          <SelectSessions />
        </div>

        <div className="p-4">
          <Tabs dir="rtl" defaultValue="rate">
            <TabsList className="grid grid-cols-3 max-w-[350px] mx-auto">
              <TabsTrigger value="rate">التقيمات</TabsTrigger>
              <TabsTrigger value="details">معلومات</TabsTrigger>
              <TabsTrigger value="article">المقال</TabsTrigger>
            </TabsList>
            <div className="my-4 max-w-[350px] mx-auto flex justify-center">
              <MainButton className="mx-auto w-full">احجز موعد الان</MainButton>
            </div>
            <TabsContent value="rate" className="grid gap-2">
              {doctor.Rate.map(({ id, message, patientName, rateValue }) => (
                <div
                  key={id}
                  className="border border-gray-200 rounded-lg p-4 dark:border-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 overflow-clip rounded-full">
                      <Image
                        src={"/images/default.jpg"}
                        alt={"المقيم " + patientName}
                        fill
                      />
                    </div>
                    <p className="font-semibold h-fit">{patientName}</p>
                  </div>
                  <div className="mt-2 text-sm">{message}</div>
                  <StarRate rate={rateValue} />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="details">
              <h3 className=" text-main text-xl my-4 font-bold">حول المعالج</h3>
              <div dangerouslySetInnerHTML={{ __html: doctor.breif }} />
              <h3 className=" text-main text-xl my-4 font-bold">
                الشهادات العلمية
              </h3>
              <p>{doctor.certificate}</p>
            </TabsContent>
            <TabsContent value="article">
              <h3 className="text-xl font-bold text-main my-2">المقال</h3>

              <div dangerouslySetInnerHTML={{ __html: doctor.article }} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
