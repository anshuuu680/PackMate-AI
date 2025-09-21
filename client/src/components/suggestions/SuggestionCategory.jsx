import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SuggestionItem from "./SuggestionItem";

function SuggestionCategory({
  title,
  icon: Icon,
  items,
  selectedItems,
  onToggle,
  categoryKey,
}) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <div className="flex gap-2 items-center">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const isSelected =
              selectedItems[categoryKey]?.some((i) => i.name === item.name) ??
              false;
            return (
              <SuggestionItem
                key={item.name}
                {...item}
                categoryKey={categoryKey}
                isSelected={isSelected}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default SuggestionCategory;
