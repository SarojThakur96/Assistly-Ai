import { auth } from "@clerk/nextjs/server";
import { ChatbotSummary } from "../../../../types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const chatbots = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chatbot/getChabotsByUserId?clerk_user_id=${userId}`
  );
  if (!chatbots.ok) {
    console.error("Failed to fetch chatbots");
    return <div>Error fetching chatbots</div>;
  }
  const data = await chatbots.json();
  const chatbotsData: (ChatbotSummary & { created_at: string })[] = data?.data;
  console.log("Chatbots fetched:", data);

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>

      {chatbotsData?.length === 0 && (
        <div>
          <p>
            You have not created any chatbot yet. Click the button below to
            create your first chatbot.
          </p>
          <Link href="/create-chatbots">
            <Button className="bg-[#64B5F6] text-white p-3 rounded-md mt-5 cursor-pointer">
              Create Chatbot
            </Button>
          </Link>
        </div>
      )}

      <ul className="flex flex-col space-y-5">
        {chatbotsData?.map((chatbot) => (
          <Link key={chatbot?.id} href={`/edit-chatbot/${chatbot?.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white">
              <div>
                <div className="flex items-center space-x-4">
                  <Avatar seed={chatbot?.name} />
                  <h2 className="text-xl font-bold">{chatbot?.name}</h2>
                </div>
                <p className="text-xs text-gray-400 right-5 top-5 absolute">
                  Created at: {new Date(chatbot?.created_at).toLocaleString()}
                </p>
              </div>
              <hr className="mt-2" />

              <div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
                <h3 className="italic">Characteristics</h3>
                <ul className="text-xs">
                  {chatbot?.chatbot_characteristics?.length === 0 ? (
                    <p className="">No characteristics added yet.</p>
                  ) : (
                    chatbot?.chatbot_characteristics?.map((characteristic) => (
                      <li
                        key={characteristic?.id}
                        className="list-disc break-words"
                      >
                        {characteristic?.content}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ViewChatbots;
