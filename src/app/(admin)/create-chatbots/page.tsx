"use client";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiBaseUrl } from "@/lib/const";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const CreateChatbot = () => {
  const { user } = useUser();
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // const [createChatbot, { data, loading, error }] = useMutation(
  //   CREATE_CHATBOT,
  //   {
  //     variables: {
  //       clerk_user_id: user?.id,
  //       name: name,
  //     },
  //   }
  // );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return;

    try {
      setLoading(true);

      const res = await fetch(`${apiBaseUrl}/api/v1/chatbot/addChatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerk_user_id: user?.id,
          name: name,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to create chatbot");
      }
      const data = await res.json();
      console.log("Chatbot created:", data);

      setName("");

      router.push(`/edit-chatbot/${data?.data?.id}`);
    } catch (error) {
      console.error("Error creating chatboat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 m-10 bg-white rounded-md md:flex-row md:space-x-10">
      <Avatar seed="create-chatboat" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold"> Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your projects. You can create a
          chatbot for any project you want.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 mt-5"
        >
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chatbot Name..."
            className="max-w-lg"
            required
          />
          <Button disabled={loading || !name}>
            {loading ? "Creating..." : "Create Chatbot"}
          </Button>
        </form>
        <p className="text-gray-300 mt-5">Example: Project Support Chatboat</p>
      </div>
    </div>
  );
};

export default CreateChatbot;
