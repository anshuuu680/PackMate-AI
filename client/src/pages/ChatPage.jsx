import { useState } from "react";
import ChatMessages from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import PreviousTrips from "../components/chat/PreviousTrips";
import DeleteModal from "@/components/common/DeleteModal";

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
    <div className="flex h-full gap-6 p-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {noMessages ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Start Your Trip Planning ✈️
            </h1>
            <p className="text-gray-500 max-w-xs">
              Ask PackMate AI for packing suggestions, trip summaries, or outfit
              ideas.
            </p>
            <div className="w-full max-w-md mt-2">
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSend={sendMessage}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 h-full">
            <ChatMessages messages={messages} className="flex-1" />
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onSend={sendMessage}
            />
          </div>
        )}
      </div>

      {/* Previous Trips */}
      <div className="hidden md:block w-60 h-full">
        <PreviousTrips />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
