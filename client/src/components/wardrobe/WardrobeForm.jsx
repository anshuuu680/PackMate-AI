import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

function WardrobeForm({ onSubmit }) {
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category) return;
    onSubmit({
      name,
      category,
      isFavorite,
      image: preview,
    });
    setName("");
    setCategory("");
    setIsFavorite(false);
    setPreview(null);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Drag and Drop Upload */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors
    ${
      dragActive
        ? "border-primary text-primary/80 bg-primary/10"
        : "border-muted text-muted-foreground bg-background"
    }
    dark:${
      dragActive
        ? "border-primary text-primary/80 bg-primary/20"
        : "border-muted text-muted-foreground bg-background"
    }
  `}
      >
        <p className="text-sm">
          {preview
            ? "Change Image"
            : "Drag & drop your image here or click to select"}
        </p>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full h-48 object-cover rounded-xl border"
          />
        )}

        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Other Fields */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Blue Denim Jacket"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="T-Shirt">T-Shirt</SelectItem>
              <SelectItem value="Shirt">Shirt</SelectItem>
              <SelectItem value="Pants">Pants</SelectItem>
              <SelectItem value="Shoes">Shoes</SelectItem>
              <SelectItem value="Jacket">Jacket</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="favorite"
            checked={isFavorite}
            onCheckedChange={(val) => setIsFavorite(val)}
          />
          <Label htmlFor="favorite">Mark as Favorite</Label>
        </div>
      </div>

      <Button type="submit" className="w-full mt-4">
        Add to Wardrobe
      </Button>
    </form>
  );
}

export default WardrobeForm;
