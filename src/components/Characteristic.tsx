import { apiBaseUrl } from "@/lib/const";
import { OctagonX } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Characteristic = ({
  id,
  content,
  fetchChatbot,
}: {
  id: number;
  content: string;
  fetchChatbot: () => void;
}) => {
  const handleRemoveCharacteristics = async () => {
    try {
      const res = fetch(
        `${apiBaseUrl}/api/v1/chatbotCharacteristics/deleteChatbotCharacteristicsById?id=${id}`
      );

      toast.promise(res, {
        loading: "Removing characteristic...",
        success: "Characteristic removed successfully",
        error: "Failed to remove characteristic",
      });
      await res;

      fetchChatbot();
    } catch (error) {
      console.error("Error removing characteristic:", error);
    }
  };

  return (
    <li key={id} className="relative p-10 bg-white border rounded-md">
      {content}
      <OctagonX
        className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
        onClick={handleRemoveCharacteristics}
      />
    </li>
  );
};

export default Characteristic;
