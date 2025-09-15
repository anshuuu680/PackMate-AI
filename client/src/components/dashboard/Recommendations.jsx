import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Recommendations({ suggestions }) {
  return (
    <div className="space-y-3">
      {suggestions.map((item, idx) => (
        <Card key={idx} className="hover:shadow-md cursor-pointer">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
