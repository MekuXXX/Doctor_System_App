import React from "react";
import { SlCalender } from "react-icons/sl";
import { IoDiamondOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import { SendNotification } from "@/components/global/SendNotification";

type Props = {};
const cardsData = [
  {
    id: 1,
    title: "الحجوزات",
    subtitle: "76",
    color: "#F72B50",
    icon: <SlCalender className="w-[1.5rem] h-[1.5rem] " />,
  },
  {
    id: 2,
    title: "دخل المستشفى",
    subtitle: "$56k",
    color: "#209F84",
    icon: <IoDiamondOutline className="w-[1.5rem] h-[1.5rem] " />,
  },
  {
    id: 3,
    title: "مجموع المرضى",
    subtitle: "783k",
    color: "#2781d5",
    icon: <IoMdHeartEmpty className="w-[1.5rem] h-[1.5rem] " />,
  },
  {
    id: 4,
    title: "العمليات",
    subtitle: "76",
    color: "#76009f",
    icon: <RxPerson className="w-[1.5rem] h-[1.5rem] " />,
  },
];

export default function page({}: Props) {
  return (
    <main className="content">
      <div className="grid gap-4">
        {/* <div className=" bg-[#F72B50] md:col-span-2 py-6 px-10 rounded-xl text-white gap-4 flex items-center justify-between">
            <div>
              <p className="text-lg">الحجوزات</p>
              <h4 className="text-xl font-bold">76</h4>
            </div>
            <div className="p-4 bg-white/25 text-white rounded-full">
              <SlCalender className="w-[1.5rem] h-[1.5rem] " />
            </div>
          </div>
          <div className=" bg-[#209F84] md:col-span-2 py-6 px-10 rounded-xl text-white flex gap-4 items-center justify-between">
            <div>
              <p className="text-lg">دخل المستشفى</p>
              <h4 className="text-xl font-bold uppercase">$56k</h4>
            </div>
            <div className="p-4 bg-white/25 text-white rounded-full">
              <IoDiamondOutline className="w-[1.5rem] h-[1.5rem] " />
            </div>
          </div>
          <div className=" bg-[#2781d5] py-6 px-10 rounded-xl text-white flex gap-4 items-center justify-between">
            <div>
              <p className="text-lg min-w-fit">مجموع المرضى</p>
              <h4 className="text-xl font-bold uppercase">783k</h4>
            </div>
            <div className="p-4 bg-white/25 text-white rounded-full">
              <IoMdHeartEmpty className="w-[1.5rem] h-[1.5rem] " />
            </div>
          </div>
          <div className=" bg-[#76009f] py-6 px-10 rounded-xl text-white flex gap-4 items-center justify-between">
            <div>
              <p className="text-lg">العمليات</p>
              <h4 className="text-xl font-bold mb-2">76</h4>
            </div>
            <div className="p-4 bg-white/25 text-white rounded-full">
              <RxPerson className="w-[1.5rem] h-[1.5rem] " />
            </div>
          </div> */}
        {cardsData.map(({ color, title, subtitle, icon, id }) => (
          <div
            key={id}
            className={`bg-[${color}] py-6 px-10 rounded-xl text-white flex gap-4 items-center justify-between`}
          >
            <div>
              <p className="text-lg min-w-fit">{title}</p>
              <h4 className="text-xl font-bold uppercase">{subtitle}</h4>
            </div>
            <div className="p-4 bg-white/25 text-white rounded-full">
              {icon}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
