import React from "react";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

function ChatWindow({ messages, input, setInput, sendMessage }) {
  const noMessages = messages.length === 0;

  return (
    <div className="flex overflow-hidden flex-col h-full border border-border rounded-lg">
      <ChatHeader />
      <div className="relative flex-1 overflow-y-auto max-h-[69vh] space-y-3">
        <div className="relative space-y-3 p-2">
          {noMessages ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No messages yet. Start a conversation ✈️
            </div>
          ) : (
            <ChatMessages messages={messages} />
          )}
        </div>
      </div>

      <div className="pb-2">
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default ChatWindow;
