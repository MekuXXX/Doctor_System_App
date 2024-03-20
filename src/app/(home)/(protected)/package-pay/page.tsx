import React, { Suspense } from "react";
import CheckoutForm, { PaymentData } from "@/components/main/CheckoutForm";
import { FaDollarSign } from "react-icons/fa6";
import { IoGitNetwork } from "react-icons/io5";
import { CgNametag } from "react-icons/cg";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CurrencyConvert from "@/components/global/CurrencyConvert";
import { getDoctorSessionTimeByType } from "@/lib/doctor-session";
import Image from "next/image";
import { auth } from "@/auth";
import { checkCoupon } from "@/actions/coupon";
import { SessionType } from "@prisma/client";
import { TAX } from "@/lib/constants";
import { readImage } from "@/actions/images";

type Props = {
  searchParams: {
    doctorPackageId: string;
    type: SessionType;
    coupon?: string;
  };
};

const order = {
  id: "UTJzWVNhbTJPajFWdlNQejVGWmE4UT09",
  doctorName: "أحمد السيد",
  price: 25,
  price_2: 15,
  data: new Date(),
  time: new Date().getTime(),
  duration: 30,
};

const instructions = [
  {
    id: 1,
    text: "جميع المتصفحات تدعم الجلسة",
  },
  {
    id: 2,
    text: "جميع الاجهزه تدعم الجلسة",
  },
  {
    id: 3,
    text: "یجب أن تكون سرعة الإنترنت لیست أقل من ١ میجا بایت في الثانیة",
  },
  {
    id: 4,
    text: "غرفة الجلسة تفتح في موعدها",
  },
  {
    id: 5,
    text: "یتم استرجاع تكلفة الجلسة كاملة في حالة إلغاء الموعد من جانب الطبیب وعدم رغبتك بتحویل حجز الجلسة لموعد آخر",
  },
  {
    id: 6,
    text: "في حالة تأجیل الجلسة قبل موعدها بمدة أقل من 3 ساعات بیتم خصم 50 % من تكلفة الجلسة المدفوعة",
  },
  {
    id: 7,
    text: "إذا تأخرت في دخول الجلسة فإن الوقت الضائع لن یكون له وقت بدیل آخر ٬ إلا إذا وافق الطبیب علي تعویض ذلك",
  },
  {
    id: 8,
    text: "إذا لم یتم حضور الجلسة أو الإعتذار عنها یتم خصم تكلفة الجلسة كاملةً ولا یتم تعویضها بأخرى إلا في حالة أن الطبیب وافق علي إعطاء العمیل جلسة أخرى بدیلة",
  },
  {
    id: 9,
    text: `
إذا حدث أي مشكلة تقنیة قبل أو أثناء الجلسة ٬ الطبیب والعمیل یجب أن یتواصلوا مع فریق الدعم لحل المشكلة؛ إذا تم حل المشكلة سوف یتم استكمال الجلسة ٬ إذا لم یتم حلها سوف یتم تعویض العمیل بموعد آخر لاستكمال جلسته مع الطبیب`,
  },
];

export default async function CheckoutPage({ searchParams }: Props) {
  const user = await auth();
  if (!user) redirect("/");
  if (user.user.role !== "USER") redirect("/");
  const { doctorPackageId, type, coupon } = searchParams;
  if (!doctorPackageId || !type) redirect("/");
  const sessionData = await db.doctorSessions.findUnique({
    where: { id: doctorPackageId },
    include: {
      doctor: {
        select: {
          doctor: {
            select: {
              name: true,
              image: true,
              DoctorData: {
                select: { id: true },
              },
            },
          },
        },
      },
    },
  });
  if (!sessionData) redirect("/");
  const { name, image, DoctorData } = sessionData.doctor.doctor;
  const doctorImage = await readImage(image);

  let checkCouponData;
  const firstPrice =
    type === "HOUR" ? sessionData.hourPackage : sessionData.halfPackage;

  if (coupon)
    checkCouponData = await checkCoupon(coupon, firstPrice, DoctorData?.id!);
  if (checkCouponData?.error)
    redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/package-pay?doctorPackageId=${doctorPackageId}&type={${type}}&couponMessage=${checkCouponData.error}`
    );

  const resultPrice = checkCouponData?.success
    ? firstPrice - checkCouponData.data.discount < 0
      ? 0
      : firstPrice - checkCouponData.data.discount
    : firstPrice;

  const newSessionData: PaymentData = {
    type: "PACKAGE",
    quantity: 4,
    sessionPrice: resultPrice,
    sessionType: type,
    doctorId: DoctorData?.id!,
    userId: user.user.id,
    coupon: checkCouponData?.data?.coupon,
  };

  if (checkCouponData?.success)
    newSessionData.coupon = checkCouponData.data.coupon;

  const OrderData = [
    {
      id: 1,
      text: "السعر",
      text_bold: <CurrencyConvert currency={newSessionData.sessionPrice!} />,
      icon: <FaDollarSign className="h-[1.5rem] w-[1.5rem]" />,
    },

    {
      id: 2,
      text: "المبلغ الضريبى",
      text_bold: <CurrencyConvert currency={Number(TAX)} />,
      icon: <FaDollarSign className="h-[1.5rem] w-[1.5rem]" />,
    },
    {
      id: 5,
      text: "مدة الجلسة",
      text_bold: `${getDoctorSessionTimeByType(
        newSessionData.sessionType
      )} دقيقة`,
      icon: <IoGitNetwork className="h-[1.5rem] w-[1.5rem]" />,
    },
    {
      id: 6,
      text: "رقم الطلب",
      text_bold: "UTJzWVNhbTJPajFWdlNQejVGWmE4UT09",
      icon: <CgNametag className="h-[1.5rem] w-[1.5rem]" />,
    },
  ];

  return (
    <div className="content">
      <div className="grid md:grid-cols-2 gap-4 bg-white shadow-2xl rounded-xl overflow-clip">
        <div className="bg-main text-white py-6 px-4 rounded-xl">
          <h3 className="text-4xl font-bold my-4">معلومات الحجر</h3>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full bg-red-900 relative overflow-clip">
              <Image
                src={doctorImage!}
                alt={`Dr.${name}`}
                fill
                className=" object-cover"
                sizes="6rem"
              />
            </div>
            <span>{name}</span>
          </div>
          {OrderData.map((order) => (
            <div className="flex gap-4 mt-6" key={order.id}>
              {order.icon}
              <div className="gap-2">
                <p className="text-xl font-bold">{order.text}</p>
                <p className="text-lg font-bold text-wrap	">{order.text_bold}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="py-8 px-4">
          {/*TODO: add loading spinner */}
          <Suspense fallback={<p>Loading...</p>}>
            <CheckoutForm session={newSessionData} />
          </Suspense>
        </div>
      </div>
      <div className="my-12 rounded-xl overflow-clip border shadow-xl">
        <h3 className="bg-main text-white font-extrabold text-xl py-4 px-4">
          تعلیمات إجراء الجلسة
        </h3>
        {instructions.map(({ id, text }) => (
          <p key={id} className="py-4 px-4 border-t">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
