"use client";

import axios from "axios";
import { FC, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { sendChatMessage } from "@/actions/message";
import { toast } from "sonner";

interface ChatInputProps {
  chatId: string;
  sessionId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatId, sessionId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const sendMessage = () => {
    startTransition(async () => {
      const res = await sendChatMessage(chatId, input, sessionId);
      if (res.error) toast.error("حدث خطأ أثناء ارسال الرسالة");
      else {
        setInput("");
        textareaRef.current?.focus();
      }
    });
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-500">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isPending && Boolean(input)) sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`أرسل رسالة`}
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 outline-none px-4"
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>

        <div className="absolute left-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrink-0">
            <Button onClick={sendMessage} type="submit" disabled={isPending}>
              ارسال
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
