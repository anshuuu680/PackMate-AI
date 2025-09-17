import React from "react";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

function ChatWindow({ messages, input, setInput, sendMessage }) {
  const noMessages = messages.length === 0;

  return (
    <div
      className={`flex overflow-hidden flex-col h-full border border-border rounded-lg
        ${noMessages ? "min-h-[85vh]" : "min-h-[85vh]"}`}
    >
      {!noMessages && <ChatHeader />}

      {noMessages ? (
        <div className="flex flex-1 flex-col justify-center items-center gap-2 p-4 ">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Start your conversation with PackMate AI
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
        </div>
      ) : (
        <>
          <div className="relative flex-1 overflow-y-auto max-h-[69vh] space-y-3 p-2">
            <ChatMessages messages={messages} />
          </div>
          <div className="pb-2">
            <ChatInput
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;
