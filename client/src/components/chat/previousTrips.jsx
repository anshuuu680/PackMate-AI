import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PreviousTrips() {
  const trips = ["London 🇬🇧", "New York 🗽", "Rome 🇮🇹"];

  return (
    <Card className="max-h-fit w-48 p-4 flex flex-col border border-gray-200">
      <h2 className="text-md font-semibold mb-4">Previous Trips</h2>
      <div className="space-y-2 text-sm">
        {trips.map((trip) => (
          <Button
            key={trip}
            variant="ghost"
            className="w-full text-left p-2 hover:bg-gray-100"
          >
            {trip}
          </Button>
        ))}
      </div>
    </Card>
  );
}
