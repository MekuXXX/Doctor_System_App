import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Doctor Data</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information of a doctor
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Enter your role" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Enter your last name" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brief-paragraph">Brief paragraph</Label>
          <Textarea
            className="min-h-[100px]"
            id="brief-paragraph"
            placeholder="Enter your brief paragraph"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="certificates-paragraph">Certificates paragraph</Label>
          <Textarea
            className="min-h-[100px]"
            id="certificates-paragraph"
            placeholder="Enter your certificates paragraph"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="article-about">Article about</Label>
          <Textarea
            className="min-h-[100px]"
            id="article-about"
            placeholder="Enter your article about"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" placeholder="Enter your position" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-upload">Image upload</Label>
          <Input id="image-upload" required type="file" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone number</Label>
          <Input
            id="phone-number"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" placeholder="Enter your country" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" placeholder="Enter your gender" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Register
        </Button>
      </div>
    </div>
  );
}
