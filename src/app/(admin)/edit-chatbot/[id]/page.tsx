"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/lib/const";
import { Copy } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { toast } from "sonner";

const EditChatBots = ({ params: { id } }: { params: { id: string } }) => {
  // const chatbotUrl = `${baseUrl}/chatbot/${id}`;

  const [chatbotUrl, setChatbotUrl] = React.useState("");

  useEffect(() => {
    setChatbotUrl(`${baseUrl}/chatbot/${id}`);
  }, [id]);

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share the link below with your team to collaborate on this chatbot.
        </p>
        <div className="flex items-center space-x-2">
          <Link
            href={chatbotUrl}
            className="w-full cursor-pointer hover:opacity-50"
          >
            <Input
              value={chatbotUrl}
              readOnly
              className="cursor-pointer bg-white"
            />
          </Link>
          <Button
            size="sm"
            className="px-3 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(chatbotUrl);
              toast.success("Link copied to clipboard!");
            }}
          >
            {/* <span className="sr-only">Copy</span> */}
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditChatBots;
