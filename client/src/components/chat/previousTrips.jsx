import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PreviousTripCard } from "./PreviousTripCard";

export default function PreviousTrips({ chats }) {
  const trips = [
    {
      destination: "London 🇬🇧",
      date: "April 2025",
      lastMessage: "Don’t forget to book a Thames river cruise 🚤",
      thumbnail:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fHww",
    },
    {
      destination: "New York 🗽",
      date: "June 2025",
      lastMessage: "Broadway tickets confirmed 🎭",
      thumbnail:
        "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      destination: "Rome 🇮🇹",
      date: "September 2025",
      lastMessage: "Colosseum tour scheduled 🏛️",
      thumbnail:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <Card className="max-h-fit w-full p-4 flex flex-col border ">
      <h2 className="text-md font-semibold mb-4">Previous Trips</h2>
      <div className="space-y-2 text-sm">
        {trips.map((trip) => (
          <PreviousTripCard
            destination={trip.destination}
            key={trip.destination}
            date={trip.date}
            lastMessage={trip.lastMessage}
            thumbnail={trip.thumbnail}
          />
        ))}
      </div>
    </Card>
  );
}
