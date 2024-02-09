import React, { Suspense } from "react";
import CheckoutForm from "@/components/main/CheckoutForm";
import { FaDollarSign } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoGitNetwork } from "react-icons/io5";
import { CgNametag } from "react-icons/cg";

type Props = {};

const order = {
  id: "UTJzWVNhbTJPajFWdlNQejVGWmE4UT09",
  doctorName: "أحمد السيد",
  price: 25,
  price_2: 15,
  data: new Date(),
  time: new Date().getTime(),
  duration: 30,
};

const OrderData = [
  {
    id: 1,
    text: "السعر",
    text_bold: "615.99EGP",
    icon: <FaDollarSign />,
  },

  {
    id: 2,
    text: "المبلغ الضريبى",
    text_bold: "154EGP",
    icon: <FaDollarSign />,
  },

  {
    id: 3,
    text: "تاريخ الجلسة",
    text_bold: "22/01/2024",
    icon: <SlCalender />,
  },
  {
    id: 4,
    text: "وقت الجلسة",
    text_bold: "05:15 م",
    icon: <CiClock2 />,
  },
  {
    id: 5,
    text: "مدة الجلسة",
    text_bold: "30 دقيقة",
    icon: <IoGitNetwork />,
  },
  {
    id: 6,
    text: "رقم الطلب",
    text_bold: "UTJzWVNhbTJPajFWdlNQejVGWmE4UT09",
    icon: <CgNametag />,
  },
];

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
export default async function CheckoutPage({}: Props) {
  return (
    <div className="content">
      <div className="grid md:grid-cols-2 gap-4 bg-white shadow-2xl rounded-xl overflow-clip">
        <div className="bg-main text-white py-6 px-4 rounded-xl">
          <h1 className="text-xl font-semibold mb-4">معلومات الحجر</h1>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full bg-red-900"></div>
            <span>{order.doctorName}</span>
          </div>
          {OrderData.map((order) => (
            <div className="flex gap-4 mt-6" key={order.id}>
              {order.icon}
              <div className="gap-2">
                <p>{order.text}</p>
                <p className="text-lg font-bold text-wrap	">{order.text_bold}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="py-8 px-4">
          <Suspense fallback={<h1>Loading...</h1>}>
            <CheckoutForm />
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
