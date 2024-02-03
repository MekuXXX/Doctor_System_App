"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";

type Props = {};

export function FullScreenToggle({}: Props) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>();

  const handleFullScreen = async () => {
    if (!isFullScreen) {
      window.document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      window.document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Button
      variant={"outline"}
      className="w-9 h-9 p-0"
      onClick={handleFullScreen}
      aria-label="ملىء الشاشة"
    >
      {isFullScreen ? (
        <RxExitFullScreen className="w-[1.2rem] h-[1.2rem]" />
      ) : (
        <RxEnterFullScreen className="w-[1.2rem] h-[1.2rem]" />
      )}
    </Button>
  );
}
