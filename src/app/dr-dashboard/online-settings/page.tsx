import React from "react";

type Props = {};

export default function OnlineSettingsPage({}: Props) {
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white shadow rounded-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">اعدادات الاورفتين</h2>
        <div className="flex items-center mt-1">
          <Checkbox id="enable-notifications" />
          <label
            className="ml-2 text-sm font-medium leading-none"
            htmlFor="enable-notifications"
          >
            تفعيل كمتصل
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium leading-none"
            htmlFor="start-time"
          >
            من
          </label>
          <Input
            className="w-full"
            id="start-time"
            placeholder="00:00"
            type="time"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium leading-none"
            htmlFor="end-time"
          >
            الى
          </label>
          <Input
            className="w-full"
            id="end-time"
            placeholder="11:00"
            type="time"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium leading-none"
            htmlFor="30-min-duration"
          >
            سعر الجلسة القصيرة لمدة 30 دقيقة
          </label>
          <Input
            className="w-full"
            id="30-min-duration"
            placeholder="40"
            type="number"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-sm font-medium leading-none"
            htmlFor="60-min-duration"
          >
            سعر الجلسة القصيرة لمدة 60 دقيقة
          </label>
          <Input
            className="w-full"
            id="60-min-duration"
            placeholder="60"
            type="number"
          />
        </div>
      </div>
      <div className="mt-6">
        <Button className="w-full">حفظ</Button>
      </div>
    </div>
  );
}
