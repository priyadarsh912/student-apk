import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExchangeItem } from "@/types/exchange";

interface AddProductFormProps {
  onAdd: (item: Omit<ExchangeItem, "id" | "date" | "user" | "reviews">) => void;
}

export function AddProductForm({ onAdd }: AddProductFormProps) {
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "" as ExchangeItem["category"],
    price: "",
    location: "",
    contact: "",
    condition: "Good" as ExchangeItem["condition"],
    imageUrl: "",
  });

  const handleSubmit = () => {
    if (!newItem.title || !newItem.description || !newItem.category) return;

    onAdd({
      title: newItem.title,
      description: newItem.description,
      category: newItem.category,
      price: newItem.price ? parseInt(newItem.price) : undefined,
      location: newItem.location || undefined,
      contact: newItem.contact || undefined,
      condition: newItem.condition,
      images: newItem.imageUrl ? [newItem.imageUrl] : [],
    });

    setNewItem({
        title: "",
        description: "",
        category: "" as ExchangeItem["category"],
        price: "",
        location: "",
        contact: "",
        condition: "Good",
        imageUrl: "",
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogDescription>
          Share what you're looking for or what you've found
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={newItem.category}
            onValueChange={(value: ExchangeItem["category"]) =>
              setNewItem({ ...newItem, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lost">Lost Item</SelectItem>
              <SelectItem value="found">Found Item</SelectItem>
              <SelectItem value="sell">Selling</SelectItem>
              <SelectItem value="buy">Looking to Buy</SelectItem>
              <SelectItem value="travel">Travel Share</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Title *</Label>
          <Input
            placeholder="Brief title for your post"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Description *</Label>
          <Textarea
            placeholder="Add details..."
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
        </div>

        {(newItem.category === "sell" || newItem.category === "buy") && (
          <>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Price (₹)</Label>
                    <Input
                        type="number"
                        placeholder="Enter price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Condition</Label>
                     <Select
                        value={newItem.condition}
                        onValueChange={(value: ExchangeItem["condition"]) =>
                        setNewItem({ ...newItem, condition: value })
                        }
                    >
                        <SelectTrigger>
                        <SelectValue placeholder="Condition" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </>
        )}

        <div className="space-y-2">
            <Label>Image URL (Optional)</Label>
            <Input
                placeholder="https://example.com/image.jpg"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Location</Label>
                <Input
                    placeholder="Where?"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                />
            </div>
             <div className="space-y-2">
                <Label>Contact Info</Label>
                <Input
                    placeholder="Email/Phone"
                    value={newItem.contact}
                    onChange={(e) => setNewItem({ ...newItem, contact: e.target.value })}
                />
            </div>
        </div>

        <Button onClick={handleSubmit} className="w-full btn-gradient">
          Create Post
        </Button>
      </div>
    </DialogContent>
  );
}
