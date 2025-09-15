import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function SmallCalendar({ selected, onSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          styles={{
            caption: { fontSize: 14, fontWeight: 600 },
          }}
        />
      </CardContent>
    </Card>
  );
}
