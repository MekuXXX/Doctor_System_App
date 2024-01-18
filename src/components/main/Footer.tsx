import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import MainButton from "../global/MainButton";

type Props = {};
const supportPages = [
  {
    id: 1,
    link: "",
    text: "سياسة الإلغاء",
  },

  {
    id: 2,
    link: "",
    text: "الشروط والأحكام",
  },

  {
    id: 3,
    link: "",
    text: "سياسة الخصوصية",
  },
  {
    id: 4,
    link: "",
    text: "اتصل بنا",
  },
  {
    id: 5,
    link: "",
    text: "من نحن",
  },
];
const footerHeader = "text-2xl font-bold mb-2";

export default function Footer({}: Props) {
  return (
    <footer className="content bg-[#20273F] text-white/75 mt-auto">
      <div className="md:flex text-center md:text-start justify-center items-center gap-4 py-6">
        <div className="pb-4 md:pb-0">
          <p className={footerHeader}>روابط مهمة</p>
          <p>
            هل تواجة صعوبة عند حجز جلسة اليك اذا شرح تفصيل لطريقة التعامل مع
            المنصة من خلال قاعدة المعرفة
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center md:self-end">
          <MainButton>قاعدة المعرفة</MainButton>
          <MainButton>الانصمام كطبيب</MainButton>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 justify-between mb-4 py-4">
        <div>
          <p className={footerHeader}>من نحن</p>
          <p>
            نفسي فيرتول اخصائي نفسي اونلاين : هو موقع تابع لشركة VIRTUALPSY LTD
            مرخصة في المملكة المتحدة برقم 14803921 وتهتم بكل مايخص العلاج النفسي
            فهو يضم عدد من افضل الاخصائيين النفسيين اون لاين مما يجعل مهمة اجراء
            الجلسات والحصول على استشارات نفسية عبر الانترنت اسهل بكثير من الحظور
            للعيادة وانتضار المواعيد لفتره كبيره
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p className={footerHeader}>الدعم</p>
            <ul>
              {supportPages.map(({ id, link, text }) => (
                <li>
                  <Link href={link}>{text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-2xl font-bold">بعض الروابط</p>
            <ul>
              <li>
                <Link href={"/doctors"}>الأطباء</Link>
              </li>
              <li>
                <Link href={"/atricles"}>المجلة</Link>
              </li>
              <li>
                <Link href={"/ask-question/new"}>اسأل الأن</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm">
          جميع الحقوق محفوظة لموقع
          <span>
            <Link
              href={"https://virtualpsy.org"}
              className="text-[#ff6251] hover:text-main transition"
            >
              {" "}
              نفسي فيرتول{" "}
            </Link>
          </span>
          &copy;
          {new Date().getFullYear()}
        </p>
        <div className="text-white flex gap-2">
          <Link href={"/"} aria-label="موقع فيسبوك الخاص بالصفحة">
            <FaFacebookF className="hover:text-main transition" />
          </Link>
          <Link href={"/"}>
            <FaXTwitter
              className="hover:text-main transition"
              aria-label="موقع تويتر الخاص بالصفحة"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
