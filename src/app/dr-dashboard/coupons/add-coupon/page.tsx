import { auth } from "@/auth";
import AddCoupon from "@/components/dashboard/AddCoupon";

type Props = {};

export default async function AddCouponPage({}: Props) {
  const user = await auth();
  return (
    <div className="content max-w-fit mx-auto border-2 rounded-xl my-8  px-6 py-12 bg-white dark:bg-dark">
      <h1 className="text-2xl mb-8">إضافة كوبون جديد</h1>
      <AddCoupon user={user?.user!} />
    </div>
  );
}
