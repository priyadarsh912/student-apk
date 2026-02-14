import { ExchangeItem, Review } from "@/types/exchange";
import { Package, ShoppingCart, Car, MapPin, Mail, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductReviews } from "./ProductReviews";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface MarketplaceItemDetailProps {
  item: ExchangeItem;
  onAddReview: (itemId: string, review: Omit<Review, "id" | "date">) => void;
  onClose: () => void;
}

const categoryIcons = {
  lost: Package,
  found: Package,
  sell: ShoppingCart,
  buy: ShoppingCart,
  travel: Car,
};

const categoryColors: Record<string, string> = {
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
  found: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  sell: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  buy: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  travel: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const categoryLabels: Record<string, string> = {
  lost: "Lost Item",
  found: "Found Item",
  sell: "For Sale",
  buy: "Wanted",
  travel: "Travel Share",
};

export function MarketplaceItemDetail({ item, onAddReview, onClose }: MarketplaceItemDetailProps) {
  const Icon = categoryIcons[item.category];
  const hasImage = item.images && item.images.length > 0;
  const isProduct = item.category === "sell" || item.category === "buy";

  const getActionButton = () => {
    switch (item.category) {
      case "lost":
        return <Button className="w-full btn-gradient">I Found This</Button>;
      case "found":
        return <Button className="w-full btn-gradient">Claim Item</Button>;
      case "sell":
        return (
          <div className="flex gap-2">
            <Button className="flex-1 btn-gradient">Buy Now</Button>
            <Button variant="outline" className="flex-1">Contact Seller</Button>
          </div>
        );
      case "buy":
        return <Button className="w-full btn-gradient">I Have This</Button>;
      case "travel":
        return <Button className="w-full btn-gradient">Join Trip</Button>;
      default:
        return <Button className="w-full btn-gradient">Contact</Button>;
    }
  };

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <Badge className={`${categoryColors[item.category]} border`}>{categoryLabels[item.category]}</Badge>
          <span className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
        </div>
        <DialogTitle className="text-2xl mt-2">{item.title}</DialogTitle>
        <DialogDescription>Posted by {item.user}</DialogDescription>
      </DialogHeader>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Image area */}
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden">
            {hasImage ? (
              <img
                src={item.images![0]}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <Icon className="h-20 w-20 text-muted-foreground/30" />
            )}
          </div>

          {/* Price */}
          {item.price != null && (
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
              <span className="font-semibold text-muted-foreground">Price</span>
              <span className="text-2xl font-bold text-primary">₹{item.price}</span>
            </div>
          )}

          {/* Location */}
          {item.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{item.location}</span>
            </div>
          )}

          {/* Contact */}
          {item.contact && (
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Contact</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{item.contact}</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          {getActionButton()}
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{item.description}</p>
          </div>

          {isProduct && item.condition && (
            <div>
              <h3 className="font-semibold mb-2">Condition</h3>
              <Badge variant="outline">{item.condition}</Badge>
            </div>
          )}

          {/* Reviews — only for products (sell/buy) */}
          {isProduct && (
            <>
              <Separator />
              <ProductReviews
                reviews={item.reviews || []}
                onAddReview={(review) => onAddReview(item.id, review)}
              />
            </>
          )}
        </div>
      </div>
    </DialogContent>
  );
}
