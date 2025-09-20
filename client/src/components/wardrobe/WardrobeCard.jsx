import React, { useState, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

function WardrobeCard({ product, onDelete, onToggleFavorite }) {
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/wardrobe/favorite/${product.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      onToggleFavorite(product.id);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      {product.image && (
        <img
          // src={product.image}
          // alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
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
          <div className="flex items-center gap-2">
            <Switch
              id={`favorite-${product.id}`}
              checked={product.isFavorite}
              onCheckedChange={handleToggleFavorite}
              disabled={loading}
            />
            <label
              htmlFor={`favorite-${product.id}`}
              className="text-sm text-gray-400 select-none"
            >
              Favorite
            </label>
          </div>

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

export default memo(WardrobeCard);
