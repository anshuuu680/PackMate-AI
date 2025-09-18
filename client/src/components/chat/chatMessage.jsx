import { useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import Typewriter from "../common/TypeWriter";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatMessages({ messages }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md text-sm shadow-md break-words whitespace-normal ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.sender === "assistant" ? (
                // Only typewriter for the latest assistant message
                idx === messages.length - 1 ? (
                  <Typewriter text={msg.message} speed={20} />
                ) : (
                  msg.message
                )
              ) : (
                msg.message
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
