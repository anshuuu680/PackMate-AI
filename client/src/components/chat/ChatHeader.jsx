import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Search } from "lucide-react";
import DeleteModal from "@/components/common/DeleteModal";

function ChatHeader({ onConfirmDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  // Autofocus when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <div className="h-16 flex items-center justify-between border-b border-border px-4 bg-background relative">
        {/* Left: Avatar / Trip Icon */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden text-xl">
            <img
              className="w-full h-full bg-cover"
              src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-sm">
              Paris 2025 Trip
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`transition-all duration-300 ease-in-out
                        px-3 py-1 rounded-md border border-input bg-background
                        text-sm focus:outline-none focus:ring-2 focus:ring-ring
                        ${
                          searchOpen
                            ? "w-48 opacity-100 ml-2"
                            : "w-0 opacity-0 p-0"
                        } `}
          />

          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <Search className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer"
            size="icon"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>

      <DeleteModal
        title="Delete Conversation"
        description="Are you sure you want to delete this chat? This action cannot be undone."
        isOpen={showDeleteModal}
        onConfirm={() => {
          onConfirmDelete?.();
          setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default ChatHeader;
