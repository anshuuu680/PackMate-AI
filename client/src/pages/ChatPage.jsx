import { useState } from "react";
import ChatCard from "@/components/chat/ChatCard";
import ChatWindow from "@/components/chat/ChatWindow";
import PreviousTrips from "@/components/chat/PreviousTrips";

const dummyMessages = [
  {
    from: "assistant",
    type: "text",
    text: "Hello! Welcome back. Ready to plan your next trip? ✈️",
    timestamp: "2025-09-15T10:00:00Z",
  },
  {
    from: "assistant",
    type: "text",
    text: "Hello! Welcome back. Ready to plan your next trip? ✈️",
    timestamp: "2025-09-15T10:00:00Z",
  },
  {
    from: "assistant",
    type: "text",
    text: "Hello! Welcome back. Ready to plan your next trip? ✈️",
    timestamp: "2025-09-15T10:00:00Z",
  },
  {
    from: "user",
    type: "text",
    text: "Yes, let's plan a trip to Paris!",
    timestamp: "2025-09-15T10:01:00Z",
  },
  {
    from: "user",
    type: "text",
    text: "Yes, let's plan a trip to Paris!",
    timestamp: "2025-09-15T10:01:00Z",
  },
  {
    from: "user",
    type: "text",
    text: "Yes, let's plan a trip to Paris!",
    timestamp: "2025-09-15T10:01:00Z",
  },
  {
    from: "assistant",
    type: "text",
    text: "Great! I can suggest hotels, activities, and flights for Paris. 🗼",
    timestamp: "2025-09-15T10:02:00Z",
  },
  {
    from: "user",
    type: "text",
    text: "Show me the best hotels near the Eiffel Tower.",
    timestamp: "2025-09-15T10:03:00Z",
  },
  {
    from: "assistant",
    type: "text",
    text: "Here are some highly rated options: Hotel A, Hotel B, Hotel C.",
    timestamp: "2025-09-15T10:04:00Z",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", type: "text", text: input },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "assistant",
          type: "text",
          text: "Got it! I’ll add this to your trip plan ✈️",
        },
      ]);
    }, 1000);
  };

  const confirmDelete = () => {
    setMessages([]);
    setShowDeleteModal(false);
  };

  const noMessages = messages.length === 0;

  return (
    <div className="flex p-4 sm:p-4 gap-6 ">
      <div className="md:w-2/3 w-full h-full">
        <ChatWindow
          messages={dummyMessages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
      <div className="h-full flex-1 hidden md:block">
        <PreviousTrips />
      </div>
    </div>
  );
}
