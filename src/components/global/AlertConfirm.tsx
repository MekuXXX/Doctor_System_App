import { AlertDialog } from "@radix-ui/react-alert-dialog";
import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type Props = {
  children: React.ReactNode;
  header: string;
  description?: string;
  alerFn: () => void;
};

export default function AlertConfirm({
  children,
  header,
  description,
  alerFn,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex items-start flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-2 self-end">
          <AlertDialogCancel>الغاء</AlertDialogCancel>
          <AlertDialogAction onClick={alerFn}>استمرار</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
