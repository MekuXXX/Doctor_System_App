import React from "react";
import { Separator } from "@/components/ui/separator";
import MainButton from "@/components/global/MainButton";
import AskQuestionCard from "@/components/main/AskQuestionCard";

type Props = {};
const cardsData = [
  {
    id: 1,
    title: "أنا حديث خريجة ومحتاج وظيفة كيف يمكن لي التقديم لديكم؟",
    username: "Ahmed Ali",
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg?w=996&t=st=1705561766~exp=1705562366~hmac=9868c8fc197381abd61b30e27393cfbacd8c8ac4fba3a56c8fbd28016b329479",
  },

  {
    id: 2,
    title: "انا حجز جلسة فورية ودفعت وبعد كده شو المفرود يحصل",
    username: "Ibrahim Mohamoud",
    image:
      "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833562.jpg?t=st=1705560878~exp=1705561478~hmac=c5207252c2aaac58a51b681be77c7e38f23f7e3eb667bee2f5be005a92e935e4",
  },
  {
    id: 3,
    title: "الجلسة اولاين ؟؟",
    username: "ـNasser Ali",
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1771330755.1705394095&semt=ais",
  },
];
export default function AskQuestionPage({}: Props) {
  return (
    <main className="content">
      <h1 className="text-2xl ">أسئلة طبية</h1>
      <Separator className="mt-4 mb-8" />
      <div className="grid grid-cols-4 gap-4 feature">
        <div className="col-span-3 flex flex-col">
          <MainButton className=" justify-self-end">اسأل الان</MainButton>
          <div className="bg-[#e5e5e5] dark:bg-[#020817] mt-8 rounded-xl p-8">
            {cardsData.map(({ id, title, username, image }) => (
              <AskQuestionCard
                key={id}
                title={title}
                className=" mt-4"
                username={username}
                image={image}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="max-w-2xl mx-auto my-8 space-y-4">
            <div className="flex flex-col p-4 border border-gray-300 rounded">
              <label
                className="mb-2 text-right text-gray-700"
                htmlFor="firstInput"
              >
                أخر المقالات
              </label>
              <Separator />
            </div>
            <div className="flex flex-col p-4 border border-gray-300 rounded">
              <label
                className="mb-2 text-right text-gray-700"
                htmlFor="secondInput"
              >
                مقالات قد تعجبك
              </label>
              <Separator />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
