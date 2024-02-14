"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsBellFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Notification, UserRole } from "@prisma/client";
import { removeNewNotificationsNumber } from "@/actions/notifications";
type Props = {
  initialData: Notification[];
  userId: string;
  role: UserRole;
  newNotifications: number;
};

export function Notifications({
  initialData,
  userId,
  newNotifications,
  role,
}: Props) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialData);
  const [newNotification, setNewNotification] = useState(newNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const buttonRef = useRef<any>();

  useEffect(() => {
    const onClickOutside = (event: Event) => {
      event.stopPropagation();
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", onClickOutside);

    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const handleItemClick = (item: any) => {
    setIsOpen(false);
  };
  useEffect(() => {
    pusherClient.subscribe("notifications");
    const handleOnNotification = (notification: Notification) => {
      setNewNotification(newNotification + 1);
      setNotifications(() => [...notifications, notification]);
    };

    if (role !== "ADMIN") {
      pusherClient.bind("new-notification", handleOnNotification);
    }

    pusherClient.bind(`new-notification:${userId}`, handleOnNotification);

    return () => {
      pusherClient.unsubscribe("notifications");
    };
  }, [notifications, userId, newNotification, role]);

  const handleClick = async () => {
    setNewNotification(0);
    await removeNewNotificationsNumber(userId);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" dir="rtl">
      <Button
        type="button"
        ref={buttonRef}
        onClick={handleClick}
        className={`bg-background border-input hover:bg-accent hover:text-accent-foreground text-black dark:text-white px-2`}
      >
        {newNotification > 0 && (
          <span
            className={`absolute w-4 h-4 rounded-full top-1 right-1 bg-main animate-bounce -z-0 grid place-content-center text-xs`}
          >
            {newNotification}
          </span>
        )}
        <BsBellFill className={`w-[1.2rem] h-[1.2rem]`} />
      </Button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 left-0 top-full mt-1 min-w-[20rem] max-h-[20rem] rounded-md shadow-lg bg-white dark:bg-dark ring-1 ring-black ring-opacity-5 overflow-y-auto"
          role="menu"
          dir="rtl"
          aria-labelledby="menu-button"
        >
          <p className="p-2 border-b font-bold select-none">اشعارات</p>
          <ul
            className="min-w-fit p-2 flex flex-col-reverse gap-4"
            dir="rtl"
            aria-labelledby="menu-button"
          >
            {notifications.length !== 0 ? (
              notifications.map((notification) => (
                <li
                  key={`${notification.name}--${notification.date}--${notification.message}`}
                  className="flex items-start gap-1 select-none"
                >
                  <Image
                    src={notification.image}
                    alt={notification.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div dir="rtl">
                    <h4 className="font-bold cursor-pointer w-fit">
                      {notification.name}
                    </h4>
                    <p className="text-sm text-black/50 dark:text-white/50">
                      {notification.message}
                    </p>
                    <small dir="ltr" className="text-[#6c757d] text-xs">
                      {notification.date}
                    </small>
                  </div>
                </li>
              ))
            ) : (
              <h1>لا توجد اشعارات</h1>
            )}
          </ul>
          <p></p>
        </div>
      )}
    </div>
  );
  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger>
  //       <span onClick={handleClick}>
  //         <Button
  //           variant={"outline"}
  //           className={`w-9 h-9 p-0 z-50`}
  //           aria-label="الإشعارات"
  //         >
  //           <span
  //             className={`relative
  //           ${
  //             isNewNotification &&
  //             'after:content-[""] after:absolute after:w-4 after:h-4 after:rounded-full after:top-1 after:right-1 after:bg-blue-600 after:animate-pulse -z-0'
  //           }
  //         `}
  //           >
  //             <BsBellFill className={`w-[1.2rem] h-[1.2rem]`} />
  //           </span>
  //         </Button>
  //       </span>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent>
  //       <DropdownMenuLabel dir="rtl">إشعارات</DropdownMenuLabel>
  //       <DropdownMenuSeparator />
  //       {NotificationsData.map((notification) => (
  //         <DropdownMenuItem
  //           key={notification.id}
  //           className="flex justify-between gap-2 mt-2"
  //         >
  //           <Image
  //             src={notification.image}
  //             alt={notification.title}
  //             width={50}
  //             height={50}
  //             placeholder="blur"
  //             className="rounded"
  //           />
  //           <div dir="rtl">
  //             <h4 className=" text-[#3d4465] font-bold cursor-pointer w-fit">
  //               {notification.title}
  //             </h4>
  //             <small className="text-[#6c757d]">
  //               {notification.date.toDateString()}
  //             </small>
  //           </div>
  //         </DropdownMenuItem>
  //       ))}
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
