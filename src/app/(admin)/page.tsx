import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-white m-10 rounded-md w-full">
      <h1 className="text-4xl font-light">
        Welcome to{" "}
        <span className="text-[#64B5F5] font-semibold">Promptly AI</span>
      </h1>
      <h2 className="mt-2 mb-10">
        Create, customize, and share AI chatbots tailored for any need.
        Effortlessly
      </h2>

      <Link href="/create-chatbots">
        <Button className="bg-[#64B5F5]">Create Your Chatbot Now</Button>
      </Link>
    </main>
  );
}
