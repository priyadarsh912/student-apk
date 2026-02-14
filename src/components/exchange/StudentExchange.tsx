import { useState } from "react";
import { Search, Package, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ExchangeItem, Review } from "@/types/exchange";
import { MarketplaceItemCard } from "./MarketplaceItemCard";
import { MarketplaceItemDetail } from "./MarketplaceItemDetail";
import { AddProductForm } from "./AddProductForm";

const mockItems: ExchangeItem[] = [
  // ── LOST ──
  {
    id: "1",
    title: "Lost Student ID Card",
    description: "Lost my ID card near Block B cafeteria. Name: Rahul Kumar, UID: 25BCS10089. Please contact if found.",
    category: "lost",
    location: "Block B Cafeteria",
    date: "2025-02-05",
    user: "Rahul K.",
    contact: "rahul@university.edu",
    images: ["https://images.unsplash.com/photo-1562564055-71e051d33c19?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "l2",
    title: "Lost Black Backpack",
    description: "Left my black Nike backpack in Lecture Hall 5 after the DSA class. Contains laptop and notes.",
    category: "lost",
    location: "Lecture Hall 5",
    date: "2025-02-08",
    user: "Karan S.",
    contact: "karan.s@university.edu",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },

  // ── FOUND ──
  {
    id: "2",
    title: "Found Wireless Earbuds",
    description: "Found a pair of white wireless earbuds in Library 2nd floor reading room. Come claim with proof.",
    category: "found",
    location: "Library 2nd Floor",
    date: "2025-02-05",
    user: "Priya S.",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "f2",
    title: "Found Water Bottle",
    description: "Found a blue Hydro Flask water bottle near the basketball court. Has a sticker on it.",
    category: "found",
    location: "Basketball Court",
    date: "2025-02-09",
    user: "Nisha R.",
    images: ["https://images.unsplash.com/photo-1602143407151-0111d1916da7?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },

  // ── SELL (Products) ──
  {
    id: "3",
    title: "Engineering Graphics Drafter Set",
    description: "Complete set with T-square, set squares, and compass. Used for 1 semester only. In original box with all accessories.",
    category: "sell",
    price: 450,
    date: "2025-02-04",
    user: "Amit T.",
    contact: "amit@university.edu",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60"],
    reviews: [
      { id: "r1", userId: "u1", userName: "Alice W.", rating: 5, comment: "Item was exactly as described. Excellent condition!", date: "2025-02-06" },
      { id: "r2", userId: "u2", userName: "Bob M.", rating: 4, comment: "Good condition, fast delivery.", date: "2025-02-07" },
    ],
  },
  {
    id: "s2",
    title: "Scientific Calculator (Casio fx-991EX)",
    description: "Casio fx-991EX ClassWiz. Barely used, bought last semester for maths. Works perfectly.",
    category: "sell",
    price: 800,
    date: "2025-02-06",
    user: "Deepak J.",
    contact: "deepak.j@university.edu",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop&q=60"],
    reviews: [
      { id: "r3", userId: "u3", userName: "Meera K.", rating: 5, comment: "Works like new. Great deal!", date: "2025-02-08" },
    ],
  },
  {
    id: "s3",
    title: "Laptop Stand — Aluminium Adjustable",
    description: "Ergonomic aluminium laptop stand, adjustable height. Fits laptops up to 17 inches. Foldable and portable.",
    category: "sell",
    price: 650,
    date: "2025-02-07",
    user: "Riya P.",
    contact: "riya.p@university.edu",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1527434082968-24da8b6a6f50?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "s4",
    title: "Wireless Mouse — Logitech M355",
    description: "Slim, silent wireless mouse. Great for daily use. Battery lasts 18 months. Comes with USB receiver.",
    category: "sell",
    price: 350,
    date: "2025-02-08",
    user: "Arjun D.",
    contact: "arjun.d@university.edu",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60"],
    reviews: [
      { id: "r4", userId: "u4", userName: "Tanya S.", rating: 4, comment: "Smooth and quiet. Happy with purchase.", date: "2025-02-09" },
    ],
  },
  {
    id: "s5",
    title: "Java Programming Textbook",
    description: "'Head First Java' by Kathy Sierra & Bert Bates. 2nd Edition. Some highlighting but pages are intact.",
    category: "sell",
    price: 200,
    date: "2025-02-09",
    user: "Pooja V.",
    contact: "pooja.v@university.edu",
    condition: "Fair",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "s6",
    title: "Desk Lamp — LED Adjustable",
    description: "USB-powered LED desk lamp with 3 brightness levels. Flexible gooseneck. Perfect for late-night study sessions.",
    category: "sell",
    price: 300,
    date: "2025-02-10",
    user: "Sanya G.",
    contact: "sanya.g@university.edu",
    condition: "New",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "s7",
    title: "Arduino Uno Starter Kit",
    description: "Complete Arduino Uno R3 kit with breadboard, jumper wires, LEDs, resistors, sensors and a project book.",
    category: "sell",
    price: 1200,
    date: "2025-02-11",
    user: "Rohit M.",
    contact: "rohit.m@university.edu",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1553406830-ef2513450d76?w=500&auto=format&fit=crop&q=60"],
    reviews: [
      { id: "r5", userId: "u5", userName: "Vikas N.", rating: 5, comment: "All components working. Saved me a lot of money!", date: "2025-02-12" },
      { id: "r6", userId: "u6", userName: "Neha T.", rating: 5, comment: "Great kit for beginners. Everything was there.", date: "2025-02-13" },
    ],
  },

  // ── BUY ──
  {
    id: "4",
    title: "Looking for DBMS Textbook",
    description: "Need 'Database System Concepts' by Silberschatz. Willing to buy or borrow for the semester.",
    category: "buy",
    date: "2025-02-04",
    user: "Sneha M.",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "b2",
    title: "Need a Second-Hand Cycle",
    description: "Looking for a basic gear cycle for campus commute. Budget ₹2000-3000. Any brand is fine.",
    category: "buy",
    date: "2025-02-07",
    user: "Manish K.",
    contact: "manish.k@university.edu",
    images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "b3",
    title: "Looking for Mechanical Keyboard",
    description: "Want to buy a used mechanical keyboard, preferably with brown or red switches. Budget under ₹2500.",
    category: "buy",
    date: "2025-02-10",
    user: "Dev A.",
    contact: "dev.a@university.edu",
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },

  // ── TRAVEL ──
  {
    id: "5",
    title: "Cab Share to Delhi Airport",
    description: "Looking for cab share to IGI Airport on Feb 10. Flight at 6 PM. Splitting fare 4 ways.",
    category: "travel",
    location: "Delhi Airport (T3)",
    date: "2025-02-10",
    user: "Vikram R.",
    contact: "vikram@university.edu",
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "6",
    title: "Weekend Trip to Kasol",
    description: "Planning a group trip to Kasol on Feb 15-16. Need 3 more people for cab sharing. ₹1500 per head.",
    category: "travel",
    location: "Kasol, HP",
    date: "2025-02-15",
    user: "Group Trip",
    images: ["https://images.unsplash.com/photo-1510255869389-985223e7428f?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
  {
    id: "t3",
    title: "Cab Share to Chandigarh Railway Station",
    description: "Need to reach Chandigarh Railway Station by 4 PM on Feb 12. Willing to split fare.",
    category: "travel",
    location: "Chandigarh Railway Stn",
    date: "2025-02-12",
    user: "Ananya B.",
    contact: "ananya.b@university.edu",
    images: ["https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=500&auto=format&fit=crop&q=60"],
    reviews: [],
  },
];

export function StudentExchange() {
  const [items, setItems] = useState<ExchangeItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExchangeItem | null>(null);
  const { toast } = useToast();

  const filteredItems = (category: string) => {
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleAddItem = (newItem: Omit<ExchangeItem, "id" | "date" | "user" | "reviews">) => {
    const item: ExchangeItem = {
      ...newItem,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      user: "You",
      reviews: [],
    };

    setItems([item, ...items]);
    setIsAddDialogOpen(false);

    toast({
      title: "Post created successfully!",
      description: "Your listing is now visible to others",
    });
  };

  const handleAddReview = (itemId: string, review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, reviews: [...(item.reviews || []), newReview] };
      }
      return item;
    });

    setItems(updatedItems);

    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem({ ...selectedItem, reviews: [...(selectedItem.reviews || []), newReview] });
    }

    toast({
      title: "Review added!",
      description: "Your review has been posted successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Student Exchange</h1>
            <p className="text-muted-foreground">Lost & Found, Buy/Sell, Travel Sharing</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <AddProductForm onAdd={handleAddItem} />
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sell">🛒 Selling</TabsTrigger>
          <TabsTrigger value="buy">🔍 Buying</TabsTrigger>
          <TabsTrigger value="lost">🔴 Lost</TabsTrigger>
          <TabsTrigger value="found">🟢 Found</TabsTrigger>
          <TabsTrigger value="travel">✈️ Travel</TabsTrigger>
        </TabsList>

        {["all", "sell", "buy", "lost", "found", "travel"].map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems(category).length > 0 ? (
                filteredItems(category).map((item) => (
                  <MarketplaceItemCard
                    key={item.id}
                    item={item}
                    onClick={(item) => setSelectedItem(item)}
                  />
                ))
              ) : (
                <Card className="card-elevated col-span-full">
                  <CardContent className="p-8 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No posts found</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      Create the first post
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <MarketplaceItemDetail
            item={selectedItem}
            onAddReview={handleAddReview}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
