import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PreviousTripCard } from "./PreviousTripCard";

export default function PreviousTrips({
  chats,
  setChatId,
  chatId,
  onConfirmDelete,
}) {
  return (
    <Card className="max-h-fit max-w-sm p-4 flex flex-col border ">
      <h2 className="text-md font-semibold mb-4">Previous Trips</h2>
      <div className="space-y-2 text-sm transition-all duration-200">
        {chats.map((trip) => (
          <PreviousTripCard
            destination={trip.title}
            id={trip.id}
            key={trip.id}
            date={trip.createdAtFormatted}
            lastMessage={trip.lastMessage.message}
            setChatId={setChatId}
            chatId={chatId}
            thumbnail={""}
            onConfirmDelete={onConfirmDelete}
          />
        ))}
      </div>
    </Card>
  );
}
