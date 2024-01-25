import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
