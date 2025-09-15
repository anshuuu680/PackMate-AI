import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecentTripsList({ trips = [] }) {
  return (
    <div className="space-y-3">
      {trips.map((t, idx) => (
        <Card key={idx} className="hover:shadow-md">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-lg">
                ✈️
              </div>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.date}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{t.status}</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground truncate">{t.note}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
