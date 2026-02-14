import { Package, ShoppingCart, Car, MapPin, Clock, User, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExchangeItem } from "@/types/exchange";

interface MarketplaceItemCardProps {
  item: ExchangeItem;
  onClick: (item: ExchangeItem) => void;
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
  lost: "Lost",
  found: "Found",
  sell: "For Sale",
  buy: "Wanted",
  travel: "Travel",
};

export function MarketplaceItemCard({ item, onClick }: MarketplaceItemCardProps) {
  const Icon = categoryIcons[item.category];
  const hasImage = item.images && item.images.length > 0;
  const isProduct = item.category === "sell" || item.category === "buy";
  const avgRating = item.reviews && item.reviews.length > 0
    ? (item.reviews.reduce((sum, r) => sum + r.rating, 0) / item.reviews.length).toFixed(1)
    : null;

  return (
    <Card
      className="card-elevated overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-border/50"
      onClick={() => onClick(item)}
    >
      {/* Image / Icon Banner */}
      <div className={`relative h-40 flex items-center justify-center overflow-hidden ${
        hasImage ? "bg-muted" : (
          item.category === "lost" ? "bg-red-500/5" :
          item.category === "found" ? "bg-emerald-500/5" :
          item.category === "travel" ? "bg-purple-500/5" : "bg-primary/5"
        )
      }`}>
        {hasImage ? (
          <img
            src={item.images![0]}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.className = "flex items-center justify-center w-full h-full";
                fallback.innerHTML = "";
                parent.appendChild(fallback);
              }
            }}
          />
        ) : (
          <Icon className={`h-12 w-12 ${
            item.category === "lost" ? "text-red-400/50" :
            item.category === "found" ? "text-emerald-400/50" :
            item.category === "travel" ? "text-purple-400/50" : "text-primary/50"
          }`} />
        )}
        <Badge className={`absolute top-3 right-3 ${categoryColors[item.category]} border`}>
          {categoryLabels[item.category]}
        </Badge>
        {item.price != null && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
            ₹{item.price}
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-base line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {item.user}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(item.date).toLocaleDateString()}
          </span>
          {item.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {item.location}
            </span>
          )}
        </div>

        {/* Bottom row: condition + rating */}
        {isProduct && (
          <div className="flex items-center justify-between pt-1">
            {item.condition && (
              <Badge variant="outline" className="text-xs">{item.condition}</Badge>
            )}
            {avgRating && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {avgRating} ({item.reviews!.length})
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
