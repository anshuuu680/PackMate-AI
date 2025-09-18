import ChatCard from "./ChatCard";
import Typewriter from "../common/TypeWriter";

export default function ChatMessages({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.from === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.type === "text" && (
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md text-sm shadow-md break-words whitespace-normal  ${
                msg.from === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.from === "assistant" ? (
                <Typewriter text={msg.text} speed={20} />
              ) : (
                msg.text
              )}
            </div>
          )}
          {msg.type === "card" && <ChatCard message={msg} />}
        </div>
      ))}
    </div>
  );
}
