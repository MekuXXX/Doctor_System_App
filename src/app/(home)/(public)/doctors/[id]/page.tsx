import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarRate from "@/components/main/StarRate";
import { FaWhatsapp } from "react-icons/fa";
import SelectSessions from "@/components/main/SelectSessions";
import SessionPackage from "@/components/main/SessionPakage";
import ChangeTimezone from "@/components/main/ChangeTimezone";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { calculateRate } from "@/lib/rate";
import { isDoctorBusy } from "@/actions/doctor";
import { isUserOnline } from "@/lib/compare-times";
import { FastSession } from "@/components/main/FastSession";

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
      Rate: { take: 10 },
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
  const isBusy = await isDoctorBusy(doctor.doctor.id);
  const isOnline = isUserOnline(
    doctor.doctorActive?.from!,
    doctor.doctorActive?.to!
  );

  return (
    <div className="content">
      <div className="feature mx-auto grid lg:grid-cols-2 gap-4 items-start">
        <div className="grid gap-8 p-4">
          <Card className="w-fit px-4 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {doctor?.doctor?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 min-w-[25rem]">
              <div className="w-[200px] h-[200px] relative overflow-clip rounded-sm">
                <Image
                  src={doctor.doctor?.image}
                  alt={`Dr.${doctor.doctor?.name}`}
                  fill
                  className=" object-cover"
                  sizes="15rem"
                />
              </div>
              <div className="flex flex-col gap-8 justify-center">
                <div>
                  <h4 className="text-xl">التخصص</h4>
                  <p className="text-lg text-gray-600">{doctor.master?.name}</p>
                </div>
                <div>
                  <h4 className="text-xl">التقييم الكلى</h4>
                  <StarRate rate={rate} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-right">
              <p className="text-md text-gray-600">{doctor.country}</p>
            </CardFooter>
          </Card>

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
          {!isBusy && isOnline && doctor.doctorActive?.isActive && (
            <>
              <FastSession
                id={doctor.doctorSessions?.id!}
                type={"HALF_HOUR"}
                image={doctor.doctor?.image || ""}
                description="احجز الان جلسة فورية نصف ساعة"
                price={doctor?.doctorSessions?.halfSessions!}
                doctorId={doctor.doctor.id}
              />

              <FastSession
                id={doctor.doctorSessions?.id!}
                type={"HOUR"}
                image={doctor.doctor?.image || ""}
                description="احجز الان جلسة فورية ساعة"
                price={doctor?.doctorSessions?.hourSessions!}
                doctorId={doctor.doctor.id}
              />
            </>
          )}
          {/* <ChangeTimezone /> */}
          <SelectSessions doctorId={id} />
          <div className="space-y-2">
            <SessionPackage
              id={doctor.doctorSessions?.id!}
              type={"HALF_HOUR"}
              image={doctor.doctor?.image || ""}
              description="باكج أربع جلسات نصف ساعة"
              price={doctor?.doctorSessions?.halfPackage!}
            />

            <SessionPackage
              id={doctor.doctorSessions?.id!}
              type={"HOUR"}
              image={doctor.doctor?.image || ""}
              description="باكج أربع جلسات ساعة"
              price={doctor?.doctorSessions?.hourPackage!}
            />
          </div>
        </div>

        <div className="p-4">
          <Tabs dir="rtl" defaultValue="rate">
            <TabsList className="grid grid-cols-3 max-w-[350px] mx-auto">
              <TabsTrigger value="rate">التقيمات</TabsTrigger>
              <TabsTrigger value="details">معلومات</TabsTrigger>
              <TabsTrigger value="article">المقال</TabsTrigger>
            </TabsList>
            <TabsContent value="rate" className="grid gap-2">
              {doctor.Rate.length > 0 ? (
                doctor.Rate.map(({ id, message, patientName, rateValue }) => (
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
                ))
              ) : (
                <h3 className="text-center my-4 text-2xl font-bold">
                  لا توجد تقييمات
                </h3>
              )}
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
