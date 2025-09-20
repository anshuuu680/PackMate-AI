import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ExpenseItem({ expense }) {
  return (
    <div className="flex justify-between items-start border-b py-3 px-4 hover:bg-secondary transition rounded">
      <div className="flex flex-col">
        {/* Expense note and category */}
        <div className="flex items-center gap-2">
          <p className="font-medium">{expense.note}</p>
          <Badge variant="secondary" className="uppercase text-xs">
            {expense.category}
          </Badge>
        </div>

        {expense.paidBy && (
          <p className="text-xs text-gray-500 mt-0.5">
            Paid by {expense.paidBy}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-0.5">
          {format(new Date(expense.date), "dd MMM yyyy, hh:mm a")}
        </p>
      </div>

      <p className="font-semibold text-red-600 text-lg mt-1">
        ₹{expense.amount}
      </p>
    </div>
  );
}
