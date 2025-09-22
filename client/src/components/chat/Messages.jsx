import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatMessages({ messages }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar"
    >
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
              className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-xl text-sm shadow-md break-words whitespace-normal ${
                msg.sender === "user"
                  ? "bg-sky-900 text-white border border-sky-700"
                  : "border "
              }`}
            >
              {msg.sender === "assistant" ? (
                idx === messages.length - 1 ? (
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
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
