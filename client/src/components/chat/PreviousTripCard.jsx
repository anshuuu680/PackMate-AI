import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export function PreviousTripCard({
  destination,
  date,
  lastMessage,
  thumbnail,
}) {
  return (
    <Card className="w-full border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer rounded-xl">
      <div className="flex items-center gap-4 p-4">
        {/* Thumbnail or fallback emoji */}
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

        <div className="flex-1 min-w-0">
          <CardTitle className="text-sm font-semibold truncate">
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
      </div>
    </Card>
  );
}
