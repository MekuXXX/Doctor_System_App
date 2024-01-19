import DiscountBadge from "@/components/main/DiscountBadge";
import DoctorsView, { DoctorType } from "@/components/main/DoctorsView";
import FAQ from "@/components/main/FAQ";
import MainSearch from "@/components/main/MainSearch";
import React from "react";

type Props = {};

export const data = [
  {
    id: 1,
    discount: 25,
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=996&t=st=1705577431~exp=1705578031~hmac=44e763dd622c8e31f519fe9187fa02478a938ff5ad69f12e2ecd8ca36d521050",
    name: "أحمد موسى",
    position: "دكتوراة في العلاج النفسي",
    priceA: 926.12,
    priceB: 772.42,
    rate: 4,
    status: true,
  },
  {
    id: 2,
    discount: 15,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=996&t=st=1705578527~exp=1705579127~hmac=68f1fb6ca45db166e073775858ad75e86ab167e677f6af0b1055687d4b57095d",
    name: "فاطمة علي",
    position: "مهندسة البرمجة",
    priceA: 845.5,
    priceB: 712.75,
    rate: 4.5,
    status: false,
  },
  {
    id: 3,
    discount: 30,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436200.jpg?w=996&t=st=1705578676~exp=1705579276~hmac=46f2df6a2cfa46086c6e56e332d1dc143dbb97d15737fc90510b4b5541dccac7",
    name: "محمد حسين",
    position: "استشاري تسويق",
    priceA: 1200.0,
    priceB: 980.5,
    rate: 3.8,
    status: true,
  },
  {
    id: 4,
    discount: 20,
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg?w=996&t=st=1705578694~exp=1705579294~hmac=8e77cc6640865810aa881e0789798180c1e4398871cfa1ad2f967fc32daf4a14",
    name: "سارة العبد",
    position: "مصممة جرافيك",
    priceA: 700.75,
    priceB: 590.5,
    rate: 4.2,
    status: false,
  },
  {
    id: 5,
    discount: 10,
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833562.jpg?w=996&t=st=1705578714~exp=1705579314~hmac=b374069e64be80e9ca53699e0190e61e56c87280847431334e90b5f2369f2573",
    name: "علي الحسين",
    position: "مدير موارد بشرية",
    priceA: 1500.0,
    priceB: 1325.5,
    rate: 4.8,
    status: false,
  },
  {
    id: 6,
    discount: 18,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=996&t=st=1705578741~exp=1705579341~hmac=41a5a5140728912c940d5263530fdaa2730eb8c3dd1198aa2c4c3370a72aa34e",
    name: "ليلى محمد",
    position: "أستاذة في الأدب الإنجليزي",
    priceA: 1050.25,
    priceB: 920.75,
    rate: 3.5,
    status: false,
  },
  {
    id: 7,
    discount: 12,
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833562.jpg?w=996&t=st=1705578714~exp=1705579314~hmac=b374069e64be80e9ca53699e0190e61e56c87280847431334e90b5f2369f2573",
    name: "حسن عبدالله",
    position: "مدير تكنولوجيا المعلومات",
    priceA: 1350.0,
    priceB: 1125.5,
    rate: 4.6,
    status: false,
  },
  {
    id: 8,
    discount: 22,
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=996&t=st=1705577431~exp=1705578031~hmac=44e763dd622c8e31f519fe9187fa02478a938ff5ad69f12e2ecd8ca36d521050",
    name: "نورا السعيد",
    position: "مهندسة معمارية",
    priceA: 980.75,
    priceB: 820.5,
    rate: 4.0,
    status: false,
  },
  {
    id: 9,
    discount: 28,
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=996&t=st=1705577431~exp=1705578031~hmac=44e763dd622c8e31f519fe9187fa02478a938ff5ad69f12e2ecd8ca36d521050",
    name: "مصطفى خليل",
    position: "محاسب مالي",
    priceA: 800.0,
    priceB: 670.5,
    rate: 3.9,
    status: false,
  },
  {
    id: 10,
    discount: 16,
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833584.jpg?w=996&t=st=1705578810~exp=1705579410~hmac=013a5655e388ecb80ed8312c3b334d5f13d8c4504e5905304a11fcdd72a8c999",
    name: "ريما صالح",
    position: "طبيبة أسنان",
    priceA: 1150.25,
    priceB: 990.75,
    rate: 4.7,
    status: false,
  },
  {
    id: 11,
    discount: 25,
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=996&t=st=1705577431~exp=1705578031~hmac=44e763dd622c8e31f519fe9187fa02478a938ff5ad69f12e2ecd8ca36d521050",
    name: "محمد علي",
    position: "أستاذ الرياضيات",
    priceA: 1100.0,
    priceB: 900.5,
    rate: 4.5,
    status: false,
  },
  {
    id: 12,
    discount: 20,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=996&t=st=1705578527~exp=1705579127~hmac=68f1fb6ca45db166e073775858ad75e86ab167e677f6af0b1055687d4b57095d",
    name: "سمية حسين",
    position: "مهندسة الكمبيوتر",
    priceA: 950.0,
    priceB: 780.5,
    rate: 4.2,
    status: false,
  },
  {
    id: 13,
    discount: 15,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436200.jpg?w=996&t=st=1705578676~exp=1705579276~hmac=46f2df6a2cfa46086c6e56e332d1dc143dbb97d15737fc90510b4b5541dccac7",
    name: "نور الدين محمد",
    position: "محلل بيانات",
    priceA: 800.75,
    priceB: 670.5,
    rate: 3.8,
    status: true,
  },
  {
    id: 14,
    discount: 12,
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg?w=996&t=st=1705578694~exp=1705579294~hmac=8e77cc6640865810aa881e0789798180c1e4398871cfa1ad2f967fc32daf4a14",
    name: "لمى العلي",
    position: "مصممة أزياء",
    priceA: 720.0,
    priceB: 600.5,
    rate: 3.5,
    status: false,
  },
  {
    id: 15,
    discount: 18,
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833562.jpg?w=996&t=st=1705578714~exp=1705579314~hmac=b374069e64be80e9ca53699e0190e61e56c87280847431334e90b5f2369f2573",
    name: "يوسف عبدالرحمن",
    position: "مهندس ميكانيكي",
    priceA: 1300.0,
    priceB: 1125.5,
    rate: 4.8,
    status: true,
  },
  {
    id: 16,
    discount: 10,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=996&t=st=1705578741~exp=1705579341~hmac=41a5a5140728912c940d5263530fdaa2730eb8c3dd1198aa2c4c3370a72aa34e",
    name: "فاطمة عبدالله",
    position: "أستاذة في اللغة العربية",
    priceA: 950.25,
    priceB: 830.75,
    rate: 3.0,
    status: true,
  },
  {
    id: 17,
    discount: 28,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=996&t=st=1705578741~exp=1705579341~hmac=41a5a5140728912c940d5263530fdaa2730eb8c3dd1198aa2c4c3370a72aa34e",
    name: "رامي مصطفى",
    position: "مهندس كهربائي",
    priceA: 1150.0,
    priceB: 990.5,
    rate: 4.2,
    status: false,
  },
];

export default function page({}: Props) {
  let availableNow: DoctorType[] = [];
  let notAvailableNow: DoctorType[] = [];
  data.forEach((doctor) =>
    doctor.status ? availableNow.push(doctor) : notAvailableNow.push(doctor)
  );

  return (
    <div className="content">
      <MainSearch />
      <DiscountBadge />
      <DoctorsView
        title="المتاحين الان"
        description="بامكانك الحجز والتحدث فوراً"
        data={availableNow}
        className="feature"
      />

      <DoctorsView
        title="الغير متاحين الان"
        description="يمكنك الحجز من خلال الجدول الوقت الذي يناسبك"
        data={notAvailableNow}
        className="feature"
      />
      <FAQ />
    </div>
  );
}
