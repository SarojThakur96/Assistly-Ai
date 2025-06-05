"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use, useEffect, useState } from "react";
import { Message } from "../../../../../types/types";
import { apiBaseUrl } from "@/lib/const";
import { toast } from "sonner";
import Avatar from "@/components/Avatar";
import Messages from "@/components/Messages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MicButton from "@/components/MicButton";

const formSchema = z.object({
  message: z.string().min(2, "Your message is to short!"),
});

function ChatbotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chatbotName, setChatbotName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputValue, setInputValue] = useState("");

  // When mic transcription completes, update the input field
  const handleMicTranscript = (text: string) => {
    setInputValue(text);
    // Optional: you can also update react-hook-form's field value:
    form.setValue("message", text, { shouldValidate: true });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const fetchChatbot = async () => {
    try {
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
      setChatbotName(data?.data?.name);
    } catch (error) {
      console.error("Error fetching chatbot:", error);
      toast.error("Failed to fetch chatbot");
    }
  };

  useEffect(() => {
    fetchChatbot();
  }, [id]);

  const handleInformationChatbot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/chatMessages/startNewChat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            chatbotId: Number(id),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data?.data?.chatSessionId) {
        setChatId(data.data.chatSessionId);
        setIsOpen(false);

        // Fetch messages for the new chat session
        const messagesRes = await fetch(
          `${apiBaseUrl}/api/v1/chatMessages/getMessagesBySession?chat_session_id=${data.data.chatSessionId}`
        );
        const messagesData = await messagesRes.json();
        if (messagesRes.ok) {
          setMessages(messagesData.data || []);
        } else {
          toast.error(messagesData?.message || "Failed to fetch messages.");
        }
      } else {
        // handle error, e.g. show a toast or error message
        toast.error(data?.message || "Failed to start chat session.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { message: formMessage } = values;
    const message = formMessage;
    form.reset();
    if (!name || !email) {
      setIsOpen(true);
      setLoading(false);
      return;
    }

    if (!message.trim()) {
      return;
    }

    // Optimistically update the UI with the user's message
    const userMessage: Message = {
      id: Date.now(),
      content: message,
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "user",
    };
    //...And show loading state for AI response
    const loadingMessage: Message = {
      id: Date.now() + 1,
      content: "Thinking...",
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "ai",
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/chatMessages/sendMessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            chat_session_id: chatId,
            chatbot_id: id,
            content: message,
          }),
        }
      );
      const result = await response.json();

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: result?.content,
                id: result?.id,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="w-full flex bg-gray-100 ">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleInformationChatbot}>
            <DialogHeader>
              <DialogTitle>Lets help you out!</DialogTitle>
              <DialogDescription>
                I just need a few details to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4 gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@appleseed.com"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={!name || !email || loading}>
                {!loading ? "Continue" : "Loading..."}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
        <div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-4">
          <Avatar
            seed={chatbotName}
            className="h-12 w-12 bg-white rounded-full border-2 border-white"
          />

          <div>
            <h1 className="truncate text-lg">{chatbotName}</h1>
            <p className="text-sm text-gray-300">
              ⚡️ Typically replies Instantly
            </p>
          </div>
        </div>

        <Messages messages={messages} chatbotName={chatbotName} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel hidden>Message</FormLabel>

                  <FormControl>
                    <div className="flex items-center bg-white border-2 rounded-md">
                      <Input
                        placeholder="Type a message"
                        {...field}
                        className="p-8 bg-white border-0 focus:outline-none focus:ring-0 outline-none ring-0 shadow-none"
                        style={{ boxShadow: "none" }}
                        autoComplete="off"
                      />
                      <MicButton onTranscriptChange={handleMicTranscript} />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="h-full"
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ChatbotPage;
