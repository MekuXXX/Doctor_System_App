import React from "react";
import { data } from "../../page";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainButton from "@/components/global/MainButton";
import StarRate from "@/components/main/StarRate";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  params: {
    id: string;
  };
};

const rateData = [
  {
    id: 1,
    rate: 4,
    name: "أحمد محمد",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "ممتاز جدا",
  },
  {
    id: 2,
    rate: 3,
    name: "فاطمة علي",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "رائعة",
  },
  {
    id: 3,
    rate: 5,
    name: "محمد حسين",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "ممتازة جدا",
  },
  {
    id: 4,
    rate: 4.5,
    name: "سارة العبد",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "رائعة جدا",
  },
  {
    id: 5,
    rate: 3.5,
    name: "علي الحسين",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "جيدة جدا",
  },
  {
    id: 6,
    rate: 4,
    name: "ليلى محمد",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "ممتازة",
  },
  {
    id: 7,
    rate: 2.5,
    name: "حسن عبدالله",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "مقبولة",
  },
  {
    id: 8,
    rate: 4.8,
    name: "نورا السعيد",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "رائعة جدا",
  },
  {
    id: 9,
    rate: 3.2,
    name: "مصطفى خليل",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "جيدة",
  },
  {
    id: 10,
    rate: 4.5,
    name: "ريما صالح",
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1705664275~exp=1705664875~hmac=b3a35b96e9e8f0e130eece7ba715f15f7a6ce0838a9b25603569777afe5bf008",
    text: "رائعة جدا",
  },
];

export default function DoctorDataPage({ params: { id } }: Props) {
  const doctorData = data.find((d) => d.id === Number(id));
  return (
    <div className="content">
      <div className="feature mx-auto grid md:grid-cols-2 gap-4">
        <div className="grid gap-4 p-4 max-h-[35rem]">
          <Card className="min-w-fit px-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {doctorData?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="w-[100px] relative">
                <Image
                  src={doctorData?.image || ""}
                  alt={`Dr.${doctorData?.name}`}
                  width={100}
                  height={200}
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-600">{doctorData?.position}</p>
                <p className="text-sm font-medium text-yellow-400 flex items-center">
                  تقييم {doctorData?.rate}
                </p>
                <p className="text-sm text-gray-600">الروابط:</p>
              </div>
            </CardContent>
            <CardFooter className="text-right">
              <p className="text-sm text-gray-600">المملكة العربية السعودية</p>
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
          <div>
            <Calendar
              className="rounded-md mx-auto border border-dark dark:border-white w-fit"
              mode="single"
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
            <div className="my-4 max-w-[350px] mx-auto flex justify-center">
              <MainButton className="mx-auto w-full">احجز موعد الان</MainButton>
            </div>
            <TabsContent value="rate" className="grid gap-2">
              {rateData.map(({ id, image, name, rate, text }) => (
                <div
                  key={id}
                  className="border border-gray-200 rounded-lg p-4 dark:border-gray-800"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage alt="user image" src={image} />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="font-semibold">{name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        داقائق فائته 5
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{text}</div>
                  <StarRate rate={rate} />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="details">
              <h3 className=" text-main text-xl my-4 font-bold">حول المعالج</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, nostrum!
              </p>
              <h3 className=" text-main text-xl my-4 font-bold">
                الشهادات العلمية
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, nostrum!
              </p>
            </TabsContent>
            <TabsContent value="article">
              <h3 className="text-xl font-bold text-main my-2">المقال</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perspiciatis reprehenderit eveniet nam doloribus fuga numquam
                molestias, laborum voluptatum doloremque enim.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
