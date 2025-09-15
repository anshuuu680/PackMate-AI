import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StatsCard({ title, value, subtitle, icon }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <div className="text-2xl font-bold mt-1">{value}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
          )}
        </div>
        {icon && <div className="text-2xl text-muted-foreground">{icon}</div>}
      </CardHeader>

      <CardContent className="pt-2">{/* optional extra content */}</CardContent>
    </Card>
  );
}
