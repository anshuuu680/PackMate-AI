import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Shirt } from "lucide-react";

export function ChatMessages({ messages }) {
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
              className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md text-sm shadow-md ${
                msg.from === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          )}

          {msg.type === "card" && <ChatCard message={msg} />}
        </div>
      ))}
    </div>
  );
}
