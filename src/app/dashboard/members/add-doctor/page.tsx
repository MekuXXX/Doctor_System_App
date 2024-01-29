// import React from "react";

// type Props = {};

// export default function AddDoctorPage({}: Props) {
//   return <div>AddDoctor</div>;
// }
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function AddDoctorPage() {
  return (
    <div className="content">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div className="flex flex-col items-center">
            <Input className="hidden" id="profile-picture-input" type="file" />
            <label htmlFor="profile-picture-input">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  alt="Profile picture"
                  src="/placeholder.svg?height=100&width=100"
                />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
            </label>
            <h2 className="mt-2 text-lg font-semibold text-gray-900">
              Dr. Maximilian Mustermann
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
          <Input placeholder="Doctor's title" />
          <Select>
            <SelectTrigger id="specialization">
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Email" type="email" />
          <Textarea placeholder="Brief paragraph about yourself." />
          <Textarea placeholder="Certificates paragraph." />
          <Textarea placeholder="Article about your field." />
          <Input placeholder="Position" />
          <Input placeholder="Phone number" type="tel" />
          <Input placeholder="Country" />
          <Select>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Password" type="password" />
          <Button className="text-sm" variant="ghost">
            Forgot password?
          </Button>
          <Button className="w-full">Continue</Button>
        </form>
      </div>
    </div>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
