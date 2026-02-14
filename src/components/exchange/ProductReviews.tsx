import { useState } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/types/exchange";

interface ProductReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date">) => void;
}

export function ProductReviews({ reviews, onAddReview }: ProductReviewsProps) {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (!newReview.trim() || rating === 0) return;

    onAddReview({
      userId: "current-user", // Mock user ID
      userName: "You", // Mock user name
      rating,
      comment: newReview,
    });

    setNewReview("");
    setRating(0);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 p-4 rounded-lg bg-secondary/5">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userName}`} />
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{review.userName}</span>
                <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-sm mt-1">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border bg-card">
        <h4 className="font-medium mb-3">Write a Review</h4>
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        <Textarea
          placeholder="Share your experience..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleSubmit} disabled={!newReview.trim() || rating === 0}>
          Post Review
        </Button>
      </div>
    </div>
  );
}
