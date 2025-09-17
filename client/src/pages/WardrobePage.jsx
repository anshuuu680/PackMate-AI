import React, { useState } from "react";
import WardrobeForm from "@/components/wardrobe/WardrobeForm";
import WardrobeCard from "@/components/wardrobe/WardrobeCard";
import DeleteModal from "@/components/common/DeleteModal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "All",
  "T-Shirt",
  "Shirt",
  "Pants",
  "Shoes",
  "Jacket",
  "Accessories",
];

const initialProducts = [
  {
    id: 1,
    name: "Blue Denim Jacket",
    category: "Jacket",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    isFavorite: false,
  },
  {
    id: 2,
    name: "White Sneakers",
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be9c5e93d7?auto=format&fit=crop&w=800&q=80",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Casual T-Shirt",
    category: "T-Shirt",
    image:
      "https://images.unsplash.com/photo-1520975922091-4368b07fddc1?auto=format&fit=crop&w=800&q=80",
    isFavorite: false,
  },
];

function WardrobePage() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete));
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

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

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">Add Outfit</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Outfit</DialogTitle>
              </DialogHeader>
              <WardrobeForm onSubmit={addProduct} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <WardrobeCard
              key={product.id}
              product={product}
              onDelete={() => {
                setProductToDelete(product.id);
                setShowDeleteModal(true);
              }}
              onToggleFavorite={() =>
                setProducts((prev) =>
                  prev.map((p) =>
                    p.id === product.id
                      ? { ...p, isFavorite: !p.isFavorite }
                      : p
                  )
                )
              }
            />
          ))
        ) : (
          <div className="col-span-full min-h-[50vh] flex items-center justify-center text-center text-gray-500">
            No outfits found.
          </div>
        )}
      </div>

      {/* Delete Modal */}
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
