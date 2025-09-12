import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function TripCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your Travel Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          onChange={setDate}
          value={date}
          className="!border-0 w-full"
          tileClassName={({ date }) => {
            // Example: highlight Oct 12–20
            const tripStart = new Date(2025, 9, 12);
            const tripEnd = new Date(2025, 9, 20);
            if (date >= tripStart && date <= tripEnd) {
              return "bg-blue-100 rounded-full";
            }
          }}
        />
      </CardContent>
    </Card>
  );
}

export default TripCalendar;
