import { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import PreviousTrips from "@/components/chat/PreviousTrips";
import { initSocket, getSocket } from "../config/socket";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const confirmDelete = () => {
    setMessages([]);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const socket = initSocket();

    socket.on("chat:receive", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat:receive");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = { from: "user", type: "text", text: input };

    const socket = getSocket();

    socket.emit("chat:send", msg);

    setMessages((prev) => [...prev, msg]);

    setInput("");
  };

  return (
    <div className="flex  p-4 sm:p-4 gap-6 ">
      <div className="md:w-2/3 w-full ">
        <ChatWindow
          messages={messages}
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
