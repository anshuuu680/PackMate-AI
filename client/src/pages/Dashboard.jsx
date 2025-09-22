import React from "react";
import { CalendarDays, Package, DollarSign, Clock } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import LineChartCard from "../components/dashboard/LineChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import RecentTripsList from "../components/dashboard/RecentTrips";
import { FaRupeeSign } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Trips",
      value: 12,
      subtitle: "since Jan 2025",
      icon: <CalendarDays className="w-6 h-6 text-sky-500" />,
    },
    {
      title: "Upcoming Trips",
      value: 5,
      subtitle: "next 30 days",
      icon: <Package className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Current Trip Expense",
      value: "₹35,000", // plain rupee symbol
      subtitle: "London Trip",
      icon: <FaRupeeSign className="w-6 h-6 text-yellow-500" />, // no icon needed
    },
    {
      title: "Total Travel Expense",
      value: "₹4,20,000", // plain rupee symbol
      subtitle: "all trips",
      icon: <FaRupeeSign className="w-6 h-6 text-yellow-500" />,
    },
  ];

  // Expense chart data
  const expenseData = [
    { name: "London", value: 350 },
    { name: "New York", value: 900 },
    { name: "Rome", value: 500 },
    { name: "Paris", value: 600 },
    { name: "Tokyo", value: 850 },
  ];

  // Trip duration or weekly trips chart
  const tripDurationData = [
    { name: "Mon", value: 1 },
    { name: "Tue", value: 2 },
    { name: "Wed", value: 1 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 2 },
    { name: "Sat", value: 1 },
    { name: "Sun", value: 0 },
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
    <div className="px-12 py-8  space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} className="h-24 p-3" />
        ))}
      </div>

      {/* Charts + Recent Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <BarChartCard
            title="Travel Expense by Trip"
            data={expenseData}
            className="h-64"
          />
          <LineChartCard
            title="Trips per Day of Week"
            data={tripDurationData}
            className="h-64"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-background border rounded-lg p-4 shadow-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Recent Trips</h2>
            <RecentTripsList trips={trips} />
          </div>
        </div>
      </div>
    </div>
  );
}
