import { AddRate } from "@/components/dashboard/AddRate";
import { ADMIN_DASHBOARD } from "@/lib/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    id: string;
  };
};

export default async function AddRatePage({ searchParams }: Props) {
  const { id } = searchParams;
  if (!id) redirect(`/${ADMIN_DASHBOARD}/rates`);
  const data = await db.rate.findUnique({ where: { id } });
  if (!data) redirect(`/${ADMIN_DASHBOARD}/rates`);

  return (
    <div className="content max-w-fit mx-auto border-2 rounded-xl my-8  px-6 py-12 bg-white dark:bg-dark">
      <h1 className="text-2xl mb-8">تعديل تقييم</h1>
      <AddRate propsData={data!} />
    </div>
  );
}
