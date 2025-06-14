"use client";

import { usePathname } from "next/navigation";
import { Message } from "../../types/types";
import Avatar from "./Avatar";
import { UserCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import moment from "moment";

function Messages({
  chatbotName,
  messages,
}: {
  chatbotName: string;
  messages: Message[];
}) {
  const path = usePathname();
  const isReviewsPage = path.includes("review-sessions");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg">
      {messages.map((message, index) => {
        const isSender = message.sender !== "user";
        return (
          <div
            key={index}
            className={`chat ${isSender ? "chat-start" : "chat-end"} relative`}
          >
            {isReviewsPage && (
              <p className="absolute -bottom-5 text-xs text-gray-300">
                sent{" "}
                {moment(message.created_at)
                  .add(5, "hours")
                  .add(30, "minutes")
                  .format("lll")}
              </p>
            )}

            <div className={`chat-image avatar w-10 ${!isSender && "-mr-4"}`}>
              {isSender ? (
                <Avatar
                  seed={chatbotName}
                  className="h-12 w-12 bg-white rounded-full "
                />
              ) : (
                <UserCircle className="text-[#2991EE]" />
              )}
            </div>

            <div
              className={`chat-bubble  ${
                isSender
                  ? "chat-bubble-primary bg-[#4D7DFB] text-white"
                  : "chat-bubble-secondary bg-gray-200 text-gray-700"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: ({ node, ...props }) => (
                    <ul
                      {...props}
                      className="list-disc list-inside ml-5 mb-5"
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside ml-5 mb-5"
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-2xl font-bold mb-5" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-xl font-bold mb-5" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-lg font-bold mb-5" />
                  ),
                  table: ({ node, ...props }) => (
                    <table
                      {...props}
                      className="table-auto w-full border-separate border-2 rounded-sm border-spacing-4 border-white mb-5"
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="text-left underline" />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      {...props}
                      className={`whitespace-break-spaces mb-5 ${
                        message.content === "Thinking..." ? "animate-pulse" : ""
                      } ${isSender ? "text-white" : "text-gray-700"}`}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      className="font-bold underline hover:text-blue-400"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}

      <div ref={ref} />
    </div>
  );
}

export default Messages;
