import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WardrobeCard from "@/components/wardrobe/WardrobeCard";
import DeleteModal from "@/components/common/DeleteModal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AddWardrobeItem from "@/components/wardrobe/AddWardrobeItem";

const categories = [
  "All",
  "T-Shirt",
  "Shirt",
  "Pants",
  "Shoes",
  "Jacket",
  "Accessories",
];

function WardrobePage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/wardrobe/get-all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        setProducts(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch wardrobe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWardrobe();
  }, []);

  const handleDelete = useCallback((id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/wardrobe/delete/${productToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
    } catch (err) {
      console.error("Failed to delete wardrobe item:", err);
    } finally {
      setProductToDelete(null);
      setShowDeleteModal(false);
    }
  }, [productToDelete]);

  const handleToggleFavorite = useCallback((id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  }, []);

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 className="text-2xl font-semibold text-primary">Wardrobe</h1>

        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
          <Select onValueChange={(val) => setFilter(val)} defaultValue="All">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AddWardrobeItem
            onItemAdded={(item) => setProducts((prev) => [...prev, item])}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {loading ? (
          <div className="col-span-full min-h-[50vh] flex items-center justify-center text-center text-gray-500">
            Loading wardrobe...
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <WardrobeCard
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id)}
              onToggleFavorite={() => handleToggleFavorite(product.id)}
            />
          ))
        ) : (
          <div className="col-span-full min-h-[50vh] flex items-center justify-center text-center text-gray-500">
            No outfits found.
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          heading="Delete Outfit?"
          subheading="This action cannot be undone. Are you sure you want to delete this outfit?"
        />
      )}
    </div>
  );
}

export default WardrobePage;
