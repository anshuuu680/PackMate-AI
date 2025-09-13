import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function WardrobeCard({ product, onDelete, onToggleFavorite }) {
  return (
    <Card className="relative overflow-hidden">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg text-primary"
        />
      )}
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-medium text-primary">{product.name}</p>
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={onToggleFavorite}
            className={`p-1 rounded transition-colors ${
              product.isFavorite ? "text-yellow-500" : "text-muted-foreground"
            }`}
          >
            <Star
              size={18}
              fill={product.isFavorite ? "currentColor" : "none"}
            />
          </button>

          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-destructive/10 text-destructive transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WardrobeCard;
