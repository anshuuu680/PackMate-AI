import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent pointer-events-none">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin pointer-events-auto" />
    </div>
  );
}

export default Loader;
