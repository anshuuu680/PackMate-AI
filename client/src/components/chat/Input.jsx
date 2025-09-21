import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ChatInput({ input, setInput, sendMessage }) {
  return (
    <div className="px-3 flex h-full items-center gap-2 sticky bottom-0">
      <Input
        placeholder="Ask anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 text-sm"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button
        onClick={sendMessage}
        className="text-white bg-sky-800 hover:bg-sky-950 cursor-pointer rounded-full"
      >
        <Send size={20} />
      </Button>
    </div>
  );
}
