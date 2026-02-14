export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface ExchangeItem {
  id: string;
  title: string;
  description: string;
  category: "lost" | "found" | "sell" | "buy" | "travel";
  price?: number;
  location?: string;
  date: string;
  user: string;
  contact?: string;
  images?: string[]; // URLs for product images
  condition?: "New" | "Like New" | "Good" | "Fair" | "Poor";
  reviews?: Review[];
}
