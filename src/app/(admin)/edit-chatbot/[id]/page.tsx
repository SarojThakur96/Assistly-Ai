"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiBaseUrl, baseUrl } from "@/lib/const";
import { Copy } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { toast } from "sonner";
import { ChatbotSummary } from "../../../../../types/types";
import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { redirect } from "next/navigation";

const EditChatBots = ({ params: { id } }: { params: { id: string } }) => {
  // const chatbotUrl = `${baseUrl}/chatbot/${id}`;

  const [chatbotUrl, setChatbotUrl] = React.useState("");
  const [chatbotData, setChatbotData] = React.useState<ChatbotSummary>();
  const [newCharacteristic, setNewCharacteristic] = React.useState("");
  const [chatbotName, setChatbotName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  // call chatbot api
  const fetchChatbot = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${apiBaseUrl}/api/v1/chatbot/getChatbotById?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      const data = await res.json();
      console.log("Chatbot fetched:", data);
      setChatbotName(data?.data?.name);
      setChatbotData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chatbot:", error);
      toast.error("Failed to fetch chatbot");
      setLoading(false);
    }
  };

  const handleAddCharacterisctics = async () => {
    // Add new characteristic to the chatbot
    if (!newCharacteristic) return;
    try {
      const res = fetch(
        `${apiBaseUrl}/api/v1/chatbotCharacteristics/addChatbotCharacteristic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatbot_id: id,
            content: newCharacteristic,
          }),
        }
      );

      toast.promise(res, {
        loading: "Adding characteristic...",
        success: "Characteristic added successfully",
        error: "Failed to add characteristic",
      });
      await res; // Wait for the fetch to complete
      fetchChatbot(); // Refresh the chatbot data
    } catch (error) {
      console.error("Error adding characteristic:", error);
      toast.error("Failed to add characteristic");
    }
  };

  const handleDeleteChatbot = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chatbot? This action cannot be undone."
    );
    if (!isConfirmed) return; // Exit if user cancels

    try {
      const res = fetch(
        `${apiBaseUrl}/api/v1/chatbot/deleteChatbotById?id=${id}`
      );

      toast.promise(res, {
        loading: "Deleting chatbot...",
        success: "Chatbot deleted successfully",
        error: "Failed to delete chatbot",
      });

      await res; // Wait for the fetch to complete
      fetchChatbot(); // Refresh the chatbot data
    } catch (error) {
      console.error("Error deleting chatbot:", error);
      toast.error("Failed to delete chatbot");
    }
  };

  const handleUpdateChatbotName = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!chatbotName) return;
    try {
      const res = fetch(`${apiBaseUrl}/api/v1/chatbot/updateChatbotNameById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: chatbotName,
        }),
      });
      toast.promise(res, {
        loading: "Updating chatbot name...",
        success: "Chatbot name updated successfully",
        error: "Failed to update chatbot name",
      });
      await res; // Wait for the fetch to complete
      fetchChatbot(); // Refresh the chatbot data
    } catch (error) {
      console.error("Error updating chatbot name:", error);
      toast.error("Failed to update chatbot name");
    }
  };

  useEffect(() => {
    fetchChatbot();
    setChatbotUrl(`${baseUrl}/chatbot/${id}`);
  }, [id]);

  // if (loading) {
  //   return (
  //     <div className="mx-auto animate-spin p-10">
  //       <Avatar seed="Chatbot creating" />
  //     </div>
  //   );
  // }

  if (!chatbotData && !loading) {
    return redirect("/view-chatbots");
  }

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

      <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button
          variant={"destructive"}
          className="absolute top-2 right-2 h-8 w-2 cursor-pointer"
          onClick={handleDeleteChatbot}
        >
          X
        </Button>
        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />
          <form
            className="flex flex-1 space-x-2 items-center"
            onSubmit={handleUpdateChatbotName}
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder={chatbotName}
              className="w-full border-none bg-transparent text-xl font-semibold"
              required
            />
            <Button type="submit" disabled={!chatbotName}>
              Update
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10">Heres What your AI Knows...</h2>
        <p>
          Your Chatbot is equipped with the following information to assist you
          in your conversation with your Project.
        </p>
        <div className="bg-gray-200 p-5 md:p-5 rounded-md mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCharacterisctics();
              setNewCharacteristic("");
            }}
            className="flex space-x-2 mb-5"
          >
            <Input
              className="bg-white"
              type="text"
              placeholder="Example: If user ask for project documents, provide document page: www.example.com/document"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>
          <ul className="flex flex-wrap-reverse gap-5">
            {chatbotData?.chatbot_characteristics?.map((item) => (
              <Characteristic
                key={item.id}
                id={item.id}
                content={item.content}
                fetchChatbot={fetchChatbot}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EditChatBots;
