import { useState, useEffect } from "react";
import axios from "axios";
import WardrobeCard from "../components/wardrobe/WardrobeCard";
import DeleteModal from "../components/common/DeleteModal";
import AddWardrobeItem from "../components/wardrobe/AddWardrobeItem";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const categories = [
  "All",
  "T-Shirt",
  "Shirt",
  "Pants",
  "Shoes",
  "Jacket",
  "Accessories",
];

export default function WardrobePage() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
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

  const handleDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/wardrobe/delete/${productToDelete}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
  };

  const handleToggleFavorite = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  return (
    <div className="px-12 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
        <h1 className="text-3xl font-bold">Wardrobe</h1>
        <AddWardrobeItem
          onItemAdded={(item) => setProducts((prev) => [...prev, item])}
        />
      </div>

      {/* Tabs for categories */}
      {categories.length > 0 && (
        <Tabs value={currentCategory} onValueChange={setCurrentCategory}>
          <TabsList className="mb-4 overflow-x-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => {
            const catProducts =
              cat === "All"
                ? products
                : products.filter((p) => p.category === cat);

            return (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {loading ? (
                    <div className="col-span-full min-h-[50vh] flex items-center justify-center text-gray-500">
                      Loading wardrobe...
                    </div>
                  ) : catProducts.length > 0 ? (
                    catProducts.map((product) => (
                      <WardrobeCard
                        key={product.id}
                        product={product}
                        onDelete={() => handleDelete(product.id)}
                        onToggleFavorite={() =>
                          handleToggleFavorite(product.id)
                        }
                      />
                    ))
                  ) : (
                    <div className="col-span-full min-h-[50vh] flex items-center justify-center text-gray-500">
                      No outfits found.
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      )}

      {/* Delete modal */}
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
