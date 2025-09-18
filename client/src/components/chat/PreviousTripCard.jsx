import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { CalendarDays, Trash2 } from "lucide-react";
import DeleteModal from "../common/DeleteModal";
import { Button } from "../ui/button";

export function PreviousTripCard({
  destination,
  date,
  id,
  lastMessage,
  setChatId,
  chatId,
  thumbnail,
  onConfirmDelete,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Card
        className={`w-full border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer rounded-xl
        ${chatId === id ? "ring-1 ring-sky-800" : ""}
        `}
      >
        <div className="flex items-center gap-4 p-4">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={destination}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl">
              ✈️
            </div>
          )}

          <div onClick={() => setChatId(id)} className="flex-1 min-w-0">
            <CardTitle
              className={`text-sm font-semibold truncate ${
                chatId === id ? "text-sky-400" : ""
              }`}
            >
              {destination}
            </CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-1" />
              {date}
            </div>

            {lastMessage && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {lastMessage}
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            className="cursor-pointer"
            size="icon"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>

        <DeleteModal
          title="Delete Conversation"
          description="Are you sure you want to delete this chat? This action cannot be undone."
          isOpen={showDeleteModal}
          onConfirm={() => {
            onConfirmDelete(id);
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      </Card>
    </>
  );
}
