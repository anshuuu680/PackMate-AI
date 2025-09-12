import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Shirt } from "lucide-react";

export function ChatCard({ message }) {
  if (message.cardType === "tripSummary") {
    return (
      <Card className="bg-white border border-gray-200 rounded-lg shadow p-4 text-sm w-72">
        <CardContent>
          <h3 className="font-semibold mb-1 flex items-center gap-1">
            <MapPin size={14} /> {message.destination}
          </h3>
          <p className="flex items-center gap-1 text-gray-600">
            <Calendar size={14} /> {message.dates}
          </p>
          <p className="mt-1 text-gray-700">🌤 {message.weather}</p>
          <Button className="mt-3 text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
            Generate Packing List
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (message.cardType === "outfitSuggestion") {
    return (
      <Card className="bg-white border border-gray-200 rounded-lg shadow p-4 text-sm w-72">
        <CardContent>
          <h3 className="font-semibold mb-2 flex items-center gap-1">
            <Shirt size={14} /> Outfit Suggestions
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {message.outfits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <Button className="mt-3 text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
            Save to Wardrobe
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}
