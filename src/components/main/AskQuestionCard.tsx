import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainButton from "@/components/global/MainButton";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  username: string;
  image: string;
  className?: string;
};

export default function AskQuestionCard({
  title,
  username,
  image,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "max-w-md mx-auto bg-white rounded-lg border shadow-sm",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <MainButton className="self-start text-white mb-6">
          شاهد الإجابة
        </MainButton>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              alt="Mostafaab"
              src={image}
              className="w-8 h-8 rounded-full aspect-auto"
            />
            <AvatarFallback>
              <Skeleton className="w-8 h-8 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-700 text-sm">نشر بواسطة: </p>
            <p className="font-medium text-gray-900">{username}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
