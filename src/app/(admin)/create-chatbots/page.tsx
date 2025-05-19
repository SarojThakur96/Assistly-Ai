import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const CreateChatbot = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 m-10 bg-white rounded-md md:flex-row md:space-x-10">
      <Avatar seed="create-chatboat" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold"> Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your projects. You can create a
          chatbot for any project you want.
        </h2>

        <form className="flex flex-col md:flex-row gap-2 mt-5">
          <Input
            type="text"
            placeholder="Chatbot Name..."
            className="max-w-lg"
            required
          />
          <Button>Create Chatbot</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateChatbot;
