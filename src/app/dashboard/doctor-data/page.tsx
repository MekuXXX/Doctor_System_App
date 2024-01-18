import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="content">
      <div className="bg-white dark:bg-dark py-8 px-6 rounded-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">بيانات الطبيب</h1>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">الاسم الأول</Label>
              <Input id="first-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">الاسم الأخير</Label>
              <Input id="last-name" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">الاسم</Label>
              <Input id="username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">التخصص</Label>
              <Input id="role" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">الحساب</Label>
            <Input id="email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">البلد</Label>
            <Input id="country" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">الجنس</Label>
            <Input id="gender" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" required type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brief-paragraph">نبذه</Label>
            <Textarea className="min-h-[100px]" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificates-paragraph">الشهادات</Label>
            <Textarea className="min-h-[100px]" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="article-about">المقال</Label>
            <Textarea className="min-h-[100px]" required />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" placeholder="Enter your position" required />
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="image-upload">الصوره</Label>
            <Input id="image-upload" required type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-number">رقم الهاتف</Label>
            <Input id="phone-number" required />
          </div>
          <Button className="w-full" type="submit">
            تحديث
          </Button>
        </div>
      </div>
    </div>
  );
}
