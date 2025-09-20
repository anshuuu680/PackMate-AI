import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TripCard from "../components/expense/TripCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Expense() {
  const [trips, setTrips] = useState([]);
  const [currentTripId, setCurrentTripId] = useState(null);
  const [tripType, setTripType] = useState("single"); // single or group

  useEffect(() => {
    const dummyTrips = [
      {
        id: 1,
        type: "single",
        name: "Goa Solo Trip",
        startDate: "2025-09-01",
        endDate: "2025-09-05",
        expenses: [
          {
            note: "Lunch at beach",
            category: "Food",
            amount: 1200,
            date: "2025-09-01T13:30:00",
          },
          {
            note: "Taxi from airport",
            category: "Transport",
            amount: 800,
            date: "2025-09-01T10:00:00",
          },
          {
            note: "Souvenirs shopping",
            category: "Shopping",
            amount: 500,
            date: "2025-09-02T15:45:00",
          },
        ],
      },
      {
        id: 2,
        type: "group",
        name: "Jaipur Group Trip",
        startDate: "2025-08-10",
        endDate: "2025-08-15",
        payments: [
          { name: "Anshu", amount: 900 }, // matches Dinner
          { name: "John", amount: 1200 }, // matches Cab
        ],
        expenses: [
          {
            note: "Dinner at hotel",
            category: "Food",
            amount: 900,
            date: "2025-08-11T19:00:00",
            paidBy: "Anshu",
          },
          {
            note: "Cab for city tour",
            category: "Transport",
            amount: 1200,
            date: "2025-08-12T09:30:00",
            paidBy: "John",
          },
        ],
      },
      {
        id: 3,
        type: "single",
        name: "Delhi Solo Trip",
        startDate: "2025-07-20",
        endDate: "2025-07-25",
        expenses: [
          {
            note: "Street food",
            category: "Food",
            amount: 700,
            date: "2025-07-21T13:15:00",
          },
          {
            note: "Metro passes",
            category: "Transport",
            amount: 600,
            date: "2025-07-22T09:00:00",
          },
          {
            note: "Mall shopping",
            category: "Shopping",
            amount: 1000,
            date: "2025-07-23T16:30:00",
          },
        ],
      },
      {
        id: 4,
        type: "group",
        name: "Goa Friends Trip",
        startDate: "2025-09-10",
        endDate: "2025-09-15",
        payments: [
          { name: "Anshu", amount: 1200 }, // Beach dinner
          { name: "John", amount: 800 }, // Boat ride
          { name: "Priya", amount: 500 }, // Snacks & drinks
        ],
        expenses: [
          {
            note: "Beach party dinner",
            category: "Food",
            amount: 1200,
            date: "2025-09-11T20:00:00",
            paidBy: "Anshu",
          },
          {
            note: "Boat ride",
            category: "Activity",
            amount: 800,
            date: "2025-09-12T11:00:00",
            paidBy: "John",
          },
          {
            note: "Snacks & drinks",
            category: "Food",
            amount: 500,
            date: "2025-09-12T16:00:00",
            paidBy: "Priya",
          },
        ],
      },
      {
        id: 5,
        type: "single",
        name: "Mumbai Solo Trip",
        startDate: "2025-06-10",
        endDate: "2025-06-15",
        expenses: [
          {
            note: "Breakfast at hotel",
            category: "Food",
            amount: 400,
            date: "2025-06-11T08:00:00",
          },
          {
            note: "City cab",
            category: "Transport",
            amount: 600,
            date: "2025-06-12T10:30:00",
          },
          {
            note: "Local shopping",
            category: "Shopping",
            amount: 900,
            date: "2025-06-13T14:00:00",
          },
        ],
      },
    ];

    setTrips(dummyTrips);
    setCurrentTripId(
      dummyTrips.filter((t) => t.type === tripType)[0]?.id || null
    );
  }, []);

  useEffect(() => {
    const filteredTrips = trips.filter((t) => t.type === tripType);
    setCurrentTripId(filteredTrips[0]?.id || null);
  }, [tripType, trips]);

  const filteredTrips = trips.filter((t) => t.type === tripType);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expense Tracking</h1>

      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium">Trip Type:</span>
        <Select value={tripType} onValueChange={setTripType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single Trip</SelectItem>
            <SelectItem value="group">Group Trip</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      {filteredTrips.length > 0 ? (
        <Tabs
          value={currentTripId?.toString()}
          onValueChange={(val) => setCurrentTripId(Number(val))}
        >
          <TabsList className="mb-4 overflow-x-auto">
            {filteredTrips.map((trip) => (
              <TabsTrigger key={trip.id} value={trip.id.toString()}>
                {trip.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredTrips.map((trip) => (
            <TabsContent key={trip.id} value={trip.id.toString()}>
              <TripCard trip={trip} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <p>No trips available for this type.</p>
      )}
    </div>
  );
}
