import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ChatInput({ value, onChange, onSend }) {
  return (
    <div className="p-3 flex items-center gap-2 sticky bottom-0 border-t border-gray-200 bg-white">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={onChange}
        className="flex-1"
      />
      <Button
        onClick={onSend}
        className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full"
      >
        <Send size={18} />
      </Button>
    </div>
  );
}
