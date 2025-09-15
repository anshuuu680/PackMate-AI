import React, { useState } from "react";

import { Users, CalendarDays, Package } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import LineChartCard from "@/components/dashboard/LineChartCard";
import BarChartCard from "@/components/dashboard/BarChartCard";
import SmallCalendar from "@/components/dashboard/SmallCalender";
import RecentTripsList from "@/components/dashboard/RecentTrips";

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState();

  const stats = [
    {
      title: "Total Trips",
      value: 12,
      subtitle: "since Jan 2025",
      icon: <CalendarDays />,
    },

    {
      title: "Upcoming Trips",
      value: 5,
      subtitle: "next 30 days",
      icon: <Package />,
    },
  ];

  const lineData = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 45 },
    { name: "Wed", value: 60 },
    { name: "Thu", value: 55 },
    { name: "Fri", value: 80 },
    { name: "Sat", value: 95 },
    { name: "Sun", value: 70 },
  ];

  const barData = [
    { name: "Hotel", value: 24 },
    { name: "Flight", value: 18 },
    { name: "Tours", value: 12 },
    { name: "Transport", value: 9 },
  ];

  const trips = [
    {
      name: "London 🇬🇧",
      date: "Aug 25 - Aug 30",
      status: "Upcoming",
      note: "Book river cruise",
    },
    {
      name: "New York 🗽",
      date: "May 10 - May 15",
      status: "Past",
      note: "Broadway tickets confirmed",
    },
    {
      name: "Rome 🇮🇹",
      date: "Dec 2 - Dec 8",
      status: "Planned",
      note: "Colosseum tour pending",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
      </div>

      {/* Charts + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <LineChartCard title="Weekly Engagement" data={lineData} />
          <BarChartCard title="Service Breakdown" data={barData} />
        </div>

        <div className="space-y-4">
          <SmallCalendar selected={selectedDay} onSelect={setSelectedDay} />
          <RecentTripsList trips={trips} />
        </div>
      </div>
    </div>
  );
}
