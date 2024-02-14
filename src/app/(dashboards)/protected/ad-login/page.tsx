import { LoginForm } from "@/components/auth/login-form";
import React from "react";

type Props = {};

export default function AdminLogin({}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-blue-600">
      <LoginForm isAdmin={true} />
    </div>
  );
}
