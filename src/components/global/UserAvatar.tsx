import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BiLogOut } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";

type Props = {
  image?: string;
  alt: string;
};

export async function UserAvatar({ image, alt }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={image}
            alt={alt}
            className="w-8 h-8 aspect-auto rounded-full"
          />
          <AvatarFallback>
            <Skeleton className="w-8 h-8 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-4 px-4 rounded bg-slate-200 dark:bg-slate-700">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={"/dashboard/profile"}
              className="flex items-center gap-1 mt-2 cursor-pointer"
            >
              <BsPerson />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-1 mt-2 cursor-pointer">
            <BiLogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
