import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import DeleteModal from "@/components/common/DeleteModal";

function Wardrobe() {
  const [products, setProducts] = useState([
    { name: "Casual T-Shirt", id: 1 },
    { name: "Summer Shorts", id: 2 },
    { name: "Denim Jacket", id: 3 },
  ]);

  const [newProduct, setNewProduct] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const addProduct = () => {
    if (!newProduct.trim()) return;
    setProducts([...products, { name: newProduct.trim(), id: Date.now() }]);
    setNewProduct("");
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete));
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Wardrobe</h1>
      </div>

      {/* Add new product */}
      <div className="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Add new outfit..."
          className="flex-1 border bg-white border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={addProduct}
          className="p-2 bg-blue-600 text-white rounded-full hover:opacity-90 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Products list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow p-4 relative"
          >
            <p className="text-gray-800 font-medium">{product.name}</p>
            <button
              onClick={() => {
                setProductToDelete(product.id);
                setShowDeleteModal(true);
              }}
              className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-500 col-span-full text-center mt-4">
            No outfits saved yet.
          </p>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          heading="Delete Outfit?"
          subheading="This action cannot be undone. Are you sure you want to delete this outfit?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Wardrobe;
