import { ChatInput } from "@/components/chat/chatInput";
import { ChatMessages } from "@/components/chat/chatMessage";
import { PreviousTrips } from "@/components/chat/previousTrips";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

function ChatPage() {
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

  return (
    <div className="flex h-full gap-4 p-2">
      <div className="flex-1 flex flex-col max-w-[70%]">
        <ChatMessages messages={messages} />
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={sendMessage}
        />
      </div>

      <PreviousTrips />

      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

export default ChatPage;
