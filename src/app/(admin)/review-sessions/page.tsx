import { auth } from "@clerk/nextjs/server";
import { ChatbotWithSessionCount } from "../../../../types/types";

async function ReviewSessions() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/v1/chatbot/getAllChatbotsWithSessionCount?clerk_user_id=${"clerk_user_2"}`
  );
  if (!response.ok) {
    console.error("Failed to fetch chat sessions");
    return <div>Error fetching chat sessions</div>;
  }
  const data = await response.json();
  console.log("Chat sessions fetched:", data);
  const chatSessions: ChatbotWithSessionCount[] = data?.data || [];

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-semibold mt-10">Chat Sessions</h1>
      <h2 className="mb-5">
        Review and manage your chat sessions here. This section will allow you
        to view past conversations, analyze user interactions, and improve your
        chatbot's performance based on user feedback.
      </h2>
    </div>
  );
}

export default ReviewSessions;
