import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ExpenseItem from "./ExpenseItem";
import { format } from "date-fns";

export default function TripCard({ trip }) {
  const totalExpense = trip.expenses.reduce((acc, e) => acc + e.amount, 0);

  // Calculate settlement for group trips
  let settlementsMap = {};
  if (trip.type === "group" && trip.payments) {
    const numMembers = trip.payments.length;
    const sharePerPerson = totalExpense / numMembers;

    trip.payments.forEach((p) => {
      const diff = p.amount - sharePerPerson;
      settlementsMap[p.name] = {
        status: diff > 0 ? "Overpaid" : diff < 0 ? "Due" : "Settled",
        amount: Math.round(Math.abs(diff)),
      };
    });
  }

  return (
    <div>
      <Card className="mb-6 shadow-lg hover:shadow-xl transition duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-xl">{trip.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {format(new Date(trip.startDate), "dd MMM yyyy")} -{" "}
            {format(new Date(trip.endDate), "dd MMM yyyy")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <ScrollArea className="max-h-[80vh] overflow-auto rounded-md border ">
            {trip.expenses.map((expense, idx) => (
              <ExpenseItem key={idx} expense={expense} />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-col gap-2">
        {/* Payments for group trips with settlement info */}
        {trip.type === "group" && trip.payments && (
          <div className="flex flex-col gap-2">
            {trip.payments.map((p, idx) => {
              const settlement = settlementsMap[p.name];
              return (
                <Card
                  key={idx}
                  className="flex justify-between items-center p-4 rounded-md shadow-sm hover:shadow-md transition"
                >
                  <span className="font-semibold">
                    {p.name}{" "}
                    {settlement && settlement.status !== "Settled" && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs font-medium rounded ${
                          settlement.status === "Overpaid"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {settlement.status}: ₹{settlement.amount}
                      </span>
                    )}
                  </span>
                  <span className="px-2 py-1 text-sm font-medium bg-red-600 rounded">
                    Paid: ₹{p.amount}
                  </span>
                </Card>
              );
            })}
          </div>
        )}

        {/* Total Spent */}
        <Card className="flex-1 p-4 flex justify-between items-center">
          <p className="font-semibold">Total Spent</p>
          <p className="text-xl font-semibold">₹{totalExpense}</p>
        </Card>
      </div>
    </div>
  );
}
