"use client";

import Link from "next/link";
import { ChatbotWithSessionCount } from "../../types/types";
import Avatar from "./Avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ReactTimeago from "react-timeago";

function ChatbotSession({
  chatSession,
}: {
  chatSession: ChatbotWithSessionCount[];
}) {
  return (
    <div className="bg-white">
      <Accordion type="single" collapsible>
        {chatSession.map((chatbot) => {
          const hashSession = Number(chatbot.session_count) > 0;
          return (
            <AccordionItem
              key={chatbot.id}
              value={`item-${chatbot.id}`}
              className="px-10 py-5 "
            >
              {hashSession ? (
                <>
                  <AccordionTrigger>
                    <div className="flex text-left items-center w-full">
                      <Avatar seed={chatbot?.name} className="mr-4 h-10 w-10" />
                      <div className="flex flex-1 justify-between space-x-4">
                        <p>{chatbot?.name}</p>
                        <p className="pr-4 font-bold text-right">
                          {chatbot?.session_count}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-5 p-5 bg-gray-100 rounded-md">
                    {chatbot.guests.map((guest) => (
                      <Link
                        href={`/review-sessions/${guest?.id}`}
                        key={guest.id}
                        className="relative p-10 bg-[#2991EE] text-white rounded-md block"
                      >
                        <p className="text-lg font-bold">
                          {guest?.name || "Anonymous"}
                        </p>

                        <p className="text-sm font-light">
                          {guest?.email || "No email provided"}
                        </p>

                        <p className="absolute top-5 right-5 text-sm">
                          <ReactTimeago date={new Date(guest?.created_at)} />
                        </p>
                      </Link>
                    ))}
                  </AccordionContent>
                </>
              ) : (
                <p>{chatbot.name}(No Sessions)</p>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ChatbotSession;
