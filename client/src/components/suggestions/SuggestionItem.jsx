import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SuggestionItem({ name, image, categoryKey, isSelected, onToggle }) {
  return (
    <Card className="w-42 rounded-lg shadow-sm hover:shadow-md transition">
      <CardContent className="p-3 flex flex-col items-center text-center space-y-2">
        <img
          src={image}
          alt={name}
          className="w-24 h-20 object-cover rounded-md border"
        />
        <h3 className="text-sm font-medium">{name}</h3>
      </CardContent>
      <CardFooter className="p-2">
        <Button
          size="sm"
          className="w-full text-xs"
          variant={isSelected ? "destructive" : "default"}
          onClick={() => onToggle(categoryKey, { name, image })}
        >
          {isSelected ? "Remove" : "Add"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SuggestionItem;
