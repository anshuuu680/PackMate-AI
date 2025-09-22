import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../features/items.slice";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Shirt,
  Pill,
  Battery,
  FileText,
  Utensils,
  Sparkles,
  Bath,
} from "lucide-react";
import SuggestionCategory from "@/components/suggestions/SuggestionCategory";

const categories = [
  {
    key: "wardrobe",
    title: "Wardrobe",
    icon: Shirt,
    items: [
      { name: "Red T-Shirt", image: "https://via.placeholder.com/80" },
      { name: "Blue Jacket", image: "https://via.placeholder.com/80" },
      { name: "Black Jeans", image: "https://via.placeholder.com/80" },
      { name: "White Sneakers", image: "https://via.placeholder.com/80" },
      { name: "Socks Pack", image: "https://via.placeholder.com/80" },
      { name: "Hoodie", image: "https://via.placeholder.com/80" },
      { name: "Hat", image: "https://via.placeholder.com/80" },
    ],
  },
  {
    key: "toiletries",
    title: "Toiletries",
    icon: Bath,
    items: [
      { name: "Toothbrush", image: "https://via.placeholder.com/80" },
      {
        name: "Shampoo (Travel Pack)",
        image: "https://via.placeholder.com/80",
      },
      { name: "Deodorant", image: "https://via.placeholder.com/80" },
      { name: "Towel", image: "https://via.placeholder.com/80" },
      { name: "Soap Bar", image: "https://via.placeholder.com/80" },
      { name: "Face Wash", image: "https://via.placeholder.com/80" },
    ],
  },
  {
    key: "health",
    title: "Medicine & Health",
    icon: Pill,
    items: [
      { name: "First Aid Kit", image: "https://via.placeholder.com/80" },
      {
        name: "Prescription Medicines",
        image: "https://via.placeholder.com/80",
      },
      { name: "Pain Relief Spray", image: "https://via.placeholder.com/80" },
      { name: "Face Masks", image: "https://via.placeholder.com/80" },
      { name: "Hand Sanitizer", image: "https://via.placeholder.com/80" },
      { name: "Vitamins", image: "https://via.placeholder.com/80" },
    ],
  },
  {
    key: "electronics",
    title: "Electronics",
    icon: Battery,
    items: [
      { name: "Mobile Charger", image: "https://via.placeholder.com/80" },
      { name: "Power Bank", image: "https://via.placeholder.com/80" },
      { name: "Headphones", image: "https://via.placeholder.com/80" },
      { name: "Travel Adapter", image: "https://via.placeholder.com/80" },
      { name: "Smartwatch", image: "https://via.placeholder.com/80" },
      { name: "Camera", image: "https://via.placeholder.com/80" },
    ],
  },
  {
    key: "documents",
    title: "Documents",
    icon: FileText,
    items: [
      { name: "Passport", image: "https://via.placeholder.com/80" },
      { name: "Tickets", image: "https://via.placeholder.com/80" },
      { name: "Hotel Bookings", image: "https://via.placeholder.com/80" },
      { name: "ID Proof", image: "https://via.placeholder.com/80" },
      { name: "Travel Insurance", image: "https://via.placeholder.com/80" },
    ],
  },
  {
    key: "snacks",
    title: "Snacks",
    icon: Utensils,
    items: [
      { name: "Energy Bars", image: "https://via.placeholder.com/80" },
      { name: "Dry Fruits", image: "https://via.placeholder.com/80" },
      { name: "Chips", image: "https://via.placeholder.com/80" },
      { name: "Water Bottle", image: "https://via.placeholder.com/80" },
      { name: "Chocolate", image: "https://via.placeholder.com/80" },
      { name: "Trail Mix", image: "https://via.placeholder.com/80" },
    ],
  },
  {
    key: "misc",
    title: "Miscellaneous",
    icon: Sparkles,
    items: [
      { name: "Backpack", image: "https://via.placeholder.com/80" },
      { name: "Travel Pillow", image: "https://via.placeholder.com/80" },
      { name: "Laundry Bag", image: "https://via.placeholder.com/80" },
      { name: "Zip-lock Bags", image: "https://via.placeholder.com/80" },
      { name: "Sunglasses", image: "https://via.placeholder.com/80" },
      { name: "Notebook & Pen", image: "https://via.placeholder.com/80" },
    ],
  },
];

export default function Suggestions() {
  const selectedItems = useSelector((state) => state.selectedItems ?? {});
  const dispatch = useDispatch();

  const handleToggleItem = (categoryKey, item) => {
    const exists = selectedItems[categoryKey]?.find(
      (i) => i.name === item.name
    );
    if (exists) {
      dispatch(removeItem({ category: categoryKey, itemName: item.name }));
    } else {
      dispatch(addItem({ category: categoryKey, item }));
    }
  };

  return (
    <div className="px-12 py-8  flex flex-col lg:flex-row gap-6">
      {/* Left: Suggestions */}
      <div className="flex-1 overflow-y-auto max-w-4xl max-h-[86.5vh]">
        <h1 className="text-3xl font-bold mb-6">Trip Suggestions</h1>
        <Tabs defaultValue="all">
          <TabsList className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
            <TabsTrigger value="all" className="text-sm font-medium">
              All
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.key}
                value={cat.key}
                className="text-sm font-medium"
              >
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {categories.map((cat) => (
              <SuggestionCategory
                key={cat.key}
                title={cat.title}
                icon={cat.icon}
                items={cat.items}
                categoryKey={cat.key}
                selectedItems={selectedItems}
                onToggle={handleToggleItem}
              />
            ))}
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat.key} value={cat.key}>
              <SuggestionCategory
                title={cat.title}
                icon={cat.icon}
                items={cat.items}
                categoryKey={cat.key}
                selectedItems={selectedItems}
                onToggle={handleToggleItem}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Right: Selected Items */}
      <Card className="w-full lg:w-72 flex-shrink-0 sticky top-32 max-h-[60vh] overflow-y-auto transition-all duration-150 ease-in-out">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Selected Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.keys(selectedItems).length === 0 && (
            <p className="text-sm text-gray-500">No items selected yet.</p>
          )}
          {Object.entries(selectedItems).map(([categoryKey, items]) =>
            items.length > 0 ? (
              <div key={categoryKey}>
                <h3 className="font-medium text-md mb-2">
                  {categories.find((c) => c.key === categoryKey)?.title}
                </h3>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <Card
                      key={item.name}
                      className="flex items-center bg-black/30 gap-3 p-1.5 rounded-md"
                    >
                      <img
                        src={item.image}
                        className="w-10 object-cover rounded-md"
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </CardContent>
      </Card>
    </div>
  );
}
