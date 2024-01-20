import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="للأسف حدثت مشكلة أثناء التحقق"
      backButtonHref="/auth/login"
      backButtonLabel="الرجوع للصفحة الرئيسية"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
