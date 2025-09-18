import { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import PreviousTrips from "@/components/chat/PreviousTrips";
import { initSocket, getSocket } from "../config/socket";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);

  //  Load chats on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/chat/all-chats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        console.log(res.data);
        setChats(res.data);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, []);

  // Socket connection
  useEffect(() => {
    const socket = initSocket();

    socket.on("chat:receive", (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("chat:receive");
    };
  }, [chatId]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg = { from: "user", type: "text", text: input, chatId };

    const socket = getSocket();
    socket.emit("chat:send", msg);

    setMessages((prev) => [...prev, msg]); // optimistic
    setInput("");

    // If first message, backend should create chat and return chatId
    // Example:
    // if (!chatId) {
    //   const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/send`, msg, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     withCredentials: true,
    //   });
    //   setChatId(data.chatId);
    // }
  };

  return (
    <div className="flex p-4 sm:p-4 gap-6">
      <div className="md:w-2/3 w-full">
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
      <div className="h-full flex-1 hidden md:block">
        <PreviousTrips chats={chats} setChatId={setChatId} />
      </div>
    </div>
  );
}
