import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsBellFill } from "react-icons/bs";
import Person1 from "#/person1.jpg";
import Person2 from "#/person2.jpg";

const NotificationsData = [
  {
    id: 1,
    image: Person1,
    title: "محمد لهمى ",
    date: new Date(),
  },
  {
    id: 2,
    image: Person2,
    title: "حسام أحمد",
    date: new Date("2015-03-01"),
  },
];

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-9 h-9 p-0"
          aria-label="الإشعارات"
        >
          <BsBellFill className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel dir="rtl">إشعارات</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NotificationsData.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className="flex justify-between gap-2 mt-2"
          >
            <Image
              src={notification.image}
              alt={notification.title}
              width={50}
              height={50}
              placeholder="blur"
              className="rounded"
            />
            <div dir="rtl">
              <h4 className=" text-[#3d4465] font-bold cursor-pointer w-fit">
                {notification.title}
              </h4>
              <small className="text-[#6c757d]">
                {notification.date.toDateString()}
              </small>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
