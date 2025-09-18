import { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import PreviousTrips from "@/components/chat/PreviousTrips";
import { initSocket, getSocket } from "../config/socket";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveChat,
  setChatId,
  setChats,
  setMessages,
  addMessage,
  removeChat,
} from "../features/chat.slice";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function ChatPage() {
  const dispatch = useDispatch();
  const { messages, chatId, chats, activeChat } = useSelector(
    (state) => state.chat
  );
  const [input, setInput] = useState("");

  // Delete chat
  const onConfirmDelete = async (chatIdToDelete) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/chat/delete-chat/${chatIdToDelete}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      dispatch(removeChat(chatIdToDelete));

      // Reset state if deleted chat was active
      if (chatIdToDelete === chatId) {
        dispatch(setChatId(null));
        dispatch(setActiveChat(null));
        dispatch(setMessages([]));
      }
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

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
      dispatch(setChats(res.data?.data || []));
    } catch (err) {
      console.error("Failed to fetch chats:", err);
    }
  };

  // Fetch all chats on mount
  useEffect(() => {
    fetchChats();
  }, [dispatch]);

  // Handle socket events
  useEffect(() => {
    const socket = initSocket();

    socket.on("chat:receive", (msg) => {
      console.log("Incoming msg:", msg);

      // If this is a brand new chat (we had no chatId yet)
      if (!chatId && msg.chatId) {
        dispatch(setChatId(msg.chatId));
        dispatch(setActiveChat({ id: msg.chatId, destination: "New Trip" })); // you may get more fields from backend
      }

      if (msg.chatId === chatId || !chatId) {
        dispatch(addMessage(msg));
      }

      if (!chatId) fetchChats();
    });

    return () => {
      socket.off("chat:receive");
    };
  }, [chatId, dispatch]);

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const socket = getSocket();
    const msg = {
      sender: "user",
      type: "text",
      message: input.trim(),
      chatId,
    };

    socket.emit("chat:send", msg);

    setInput("");
  };

  const handleChatSelect = async (selectedChatId) => {
    dispatch(setChatId(selectedChatId));
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chat/fetch-chat/${selectedChatId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      dispatch(setActiveChat(res.data?.data?.chat || null));
      dispatch(setMessages(res.data?.data?.messages || []));
    } catch (err) {
      console.error("Failed to fetch chat messages:", err);
    }
  };

  const handleNewChat = () => {
    dispatch(setChatId(null));
    dispatch(setActiveChat(null));
    dispatch(setMessages([]));
  };

  return (
    <div className="flex p-4 sm:p-4 gap-6">
      <div className="md:w-2/3 w-full">
        <ChatWindow
          messages={messages}
          onConfirmDelete={() => onConfirmDelete(activeChat?.id)}
          input={input}
          setInput={setInput}
          activeChat={activeChat}
          sendMessage={sendMessage}
        />
      </div>
      <div className="h-full md:flex flex-col flex-1 hidden gap-2">
        <Card
          onClick={handleNewChat}
          className="w-full border bg-background 
                 hover:shadow-md hover:scale-[1.02] transition-all 
                 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-full bg-sky-50 flex items-center justify-center">
                <Plus className="w-5 h-5 text-sky-500" />
              </div>
              <h1 className="text-md font-semibold ">New Chat</h1>
            </div>
          </div>
        </Card>
        <PreviousTrips
          chats={chats}
          setChatId={handleChatSelect}
          chatId={chatId}
          onConfirmDelete={onConfirmDelete}
        />
      </div>
    </div>
  );
}
