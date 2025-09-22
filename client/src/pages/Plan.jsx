import React from "react";
import { useSelector } from "react-redux";

export default function Plan() {
  const selectedItems = useSelector((state) => state.selectedItems ?? {});

  if (!selectedItems || Object.keys(selectedItems).length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-gray-500 dark:text-gray-400 text-lg">
        No items selected yet.
      </div>
    );
  }

  return (
    <div className="px-12 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Your Packing Plan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(selectedItems).map(([category, items]) =>
          items.length > 0 ? (
            <div
              key={category}
              className="bg-background border border-border rounded-lg shadow-sm p-4 flex flex-col"
            >
              {/* Category header */}
              <h2 className="text-lg font-semibold mb-3 border-b border-border pb-1 text-foreground">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-3 mt-2">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-md p-2 bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md border border-border"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
