"use client";

import Messages from "@/components/Messages";
import { apiBaseUrl } from "@/lib/const";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { ChatbotWithMessages } from "../../../../../types/types";
import Avatar from "@/components/Avatar";
import moment from "moment";

const ReviewSession = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotWithMessages>({
    id: 0,
    name: null,
    email: null,
    created_at: "",
    chatbot_name: "",
    messages: [],
  });

  const fetchChatbotMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${apiBaseUrl}/api/v1/chatbot/getAllChatbotsWithMessages?guest_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("Chatbot messages fetched:", data);
      setChatbotMessages(data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chatbot messages:", error);
      toast.error("Failed to fetch chatbot messages");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatbotMessages();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto animate-ping p-10">
        <Avatar seed="Promptly AI Chatbot review" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-xs text-gray-400 mt-2">
        Started at
        {process.env.NODE_ENV === "development"
          ? moment(chatbotMessages?.created_at)
              .add(5, "hours")
              .add(30, "minutes")
              .format("lll")
          : moment(chatbotMessages?.created_at).format("lll")}
      </p>
      <h2 className="font-light mt-2">
        Between {chatbotMessages?.chatbot_name} &{" "}
        <span className="font-extrabold">
          {chatbotMessages?.name} ({chatbotMessages?.email})
        </span>
      </h2>

      <hr className="my-10" />

      <Messages
        chatbotName={chatbotMessages?.chatbot_name}
        messages={chatbotMessages.messages}
      />
    </div>
  );
};

export default ReviewSession;
