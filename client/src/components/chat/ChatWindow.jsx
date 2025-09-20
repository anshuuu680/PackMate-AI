import React from "react";
import ChatMessages from "./ChatMessage.jsx";
import ChatInput from "./ChatInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import { motion, AnimatePresence } from "framer-motion";

function ChatWindow({
  messages,
  input,
  setInput,
  sendMessage,
  activeChat,
  onConfirmDelete,
}) {
  const noMessages = messages.length === 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeChat?.id || "no-chat"}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex overflow-hidden flex-col h-full border border-border rounded-lg min-h-[86vh]`}
      >
        {!noMessages && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChatHeader
              onConfirmDelete={onConfirmDelete}
              activeChat={activeChat}
            />
          </motion.div>
        )}

        {noMessages ? (
          <motion.div
            className="flex flex-1 flex-col justify-center items-center gap-2 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Hey PackMate here, your travel companion!
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Ask questions about your trips, plans, or destinations.
            </p>
            <div className="w-full max-w-md">
              <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
              />
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="relative flex-1 overflow-y-auto max-h-[69vh] space-y-3 p-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessages messages={messages} />
            </motion.div>
            <motion.div
              className="pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default ChatWindow;
