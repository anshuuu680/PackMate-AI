import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import WardrobeForm from "../../components/wardrobe/WardrobeForm";
import axios from "axios";
import { useState } from "react";

export default function AddWardrobeItem({ onItemAdded }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAdd = async (product) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wardrobe/add-item`,
        product,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const savedItem = res.data?.data;
      if (savedItem) {
        onItemAdded(savedItem);
        setOpen(false);
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" disabled={loading}>
          Add Outfit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Outfit</DialogTitle>
        </DialogHeader>
        <WardrobeForm onSubmit={handleAdd} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
