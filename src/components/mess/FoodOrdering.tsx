import { useState } from "react";
import { ShoppingCart, Star, Clock, MapPin, Search, Filter, Plus, Minus, X, Check, Utensils, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  type: "veg" | "non-veg";
  image?: string;
  popular?: boolean;
  rating?: number;
}

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  distance: string;
  items: FoodItem[];
}

interface CartItem extends FoodItem {
  quantity: number;
  restaurantName: string;
}

// Mock data for nearby restaurants
const nearbyRestaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Campus Cafe",
    rating: 4.5,
    deliveryTime: "15-20 min",
    cuisine: "Fast Food, Beverages",
    distance: "0.5 km",
    items: [
      { id: "r1i1", name: "Veg Burger", price: 80, description: "Crispy veg patty with fresh veggies", type: "veg", popular: true, rating: 4.6 },
      { id: "r1i2", name: "Chicken Burger", price: 120, description: "Grilled chicken with special sauce", type: "non-veg", popular: true, rating: 4.7 },
      { id: "r1i3", name: "French Fries", price: 60, description: "Crispy golden fries", type: "veg", rating: 4.3 },
      { id: "r1i4", name: "Cold Coffee", price: 70, description: "Refreshing cold coffee", type: "veg", rating: 4.5 },
    ],
  },
  {
    id: "r2",
    name: "Desi Dhaba",
    rating: 4.3,
    deliveryTime: "20-25 min",
    cuisine: "North Indian, Thali",
    distance: "1.2 km",
    items: [
      { id: "r2i1", name: "Paneer Tikka", price: 150, description: "Grilled cottage cheese with spices", type: "veg", popular: true, rating: 4.8 },
      { id: "r2i2", name: "Butter Chicken", price: 200, description: "Creamy tomato-based chicken curry", type: "non-veg", popular: true, rating: 4.9 },
      { id: "r2i3", name: "Dal Tadka", price: 100, description: "Yellow lentils with tempering", type: "veg", rating: 4.4 },
      { id: "r2i4", name: "Garlic Naan", price: 40, description: "Soft naan with garlic", type: "veg", rating: 4.5 },
    ],
  },
  {
    id: "r3",
    name: "Pizza Corner",
    rating: 4.6,
    deliveryTime: "25-30 min",
    cuisine: "Italian, Pizza",
    distance: "0.8 km",
    items: [
      { id: "r3i1", name: "Margherita Pizza", price: 180, description: "Classic cheese pizza", type: "veg", popular: true, rating: 4.7 },
      { id: "r3i2", name: "Chicken Supreme", price: 250, description: "Loaded with chicken toppings", type: "non-veg", popular: true, rating: 4.8 },
      { id: "r3i3", name: "Pasta Alfredo", price: 160, description: "Creamy white sauce pasta", type: "veg", rating: 4.5 },
      { id: "r3i4", name: "Garlic Bread", price: 80, description: "Toasted bread with garlic butter", type: "veg", rating: 4.4 },
    ],
  },
];

// Mock data for college mess pre-orders
const messItems: FoodItem[] = [
  { id: "m1", name: "Special Thali", price: 100, description: "Dal, Sabji, Rice, Roti, Salad, Sweet", type: "veg", popular: true, rating: 4.5 },
  { id: "m2", name: "Chicken Biryani", price: 150, description: "Aromatic rice with chicken", type: "non-veg", popular: true, rating: 4.8 },
  { id: "m3", name: "Chole Bhature", price: 80, description: "Spicy chickpeas with fried bread", type: "veg", rating: 4.6 },
  { id: "m4", name: "Egg Curry Meal", price: 90, description: "Egg curry with rice and roti", type: "non-veg", rating: 4.4 },
  { id: "m5", name: "Paneer Paratha Combo", price: 70, description: "2 parathas with curd and pickle", type: "veg", rating: 4.3 },
  { id: "m6", name: "South Indian Combo", price: 85, description: "Idli, Vada, Sambar, Chutney", type: "veg", popular: true, rating: 4.7 },
];

export function FoodOrdering() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "veg" | "non-veg">("all");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item: FoodItem, restaurantName: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, restaurantName }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      clearCart();
    }, 3000);
  };

  const filterItems = (items: FoodItem[]) => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  const renderFoodItem = (item: FoodItem, restaurantName: string) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    const quantity = cartItem?.quantity || 0;

    return (
      <Card key={item.id} className="card-elevated hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {item.type === "veg" ? (
                  <div className="h-4 w-4 border-2 border-success rounded flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                ) : (
                  <div className="h-4 w-4 border-2 border-destructive rounded flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                  </div>
                )}
                <h4 className="font-semibold">{item.name}</h4>
                {item.popular && (
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-accent">₹{item.price}</span>
                {item.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {quantity === 0 ? (
                <Button
                  size="sm"
                  onClick={() => addToCart(item, restaurantName)}
                  className="bg-accent hover:bg-accent/90"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              ) : (
                <div className="flex items-center gap-2 bg-accent/10 rounded-lg p-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-semibold min-w-[20px] text-center">{quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => addToCart(item, restaurantName)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderRestaurant = (restaurant: Restaurant) => {
    const filteredItems = filterItems(restaurant.items);
    if (filteredItems.length === 0) return null;

    return (
      <div key={restaurant.id} className="space-y-3">
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                <CardDescription className="mt-1">{restaurant.cuisine}</CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-success/10 px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-success text-success" />
                <span className="font-semibold">{restaurant.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {restaurant.deliveryTime}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {restaurant.distance}
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="grid gap-3">
          {filteredItems.map((item) => renderFoodItem(item, restaurant.name))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Utensils className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Order Food</h1>
            <p className="text-muted-foreground">From nearby area or college mess</p>
          </div>
        </div>
        {cart.length > 0 && (
          <div className="relative">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              <Badge className="ml-2 bg-accent">{getTotalItems()}</Badge>
            </Button>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "veg" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("veg")}
            className="flex items-center gap-1"
          >
            <div className="h-3 w-3 border-2 border-success rounded flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
            </div>
            Veg
          </Button>
          <Button
            variant={filterType === "non-veg" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("non-veg")}
            className="flex items-center gap-1"
          >
            <div className="h-3 w-3 border-2 border-destructive rounded flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
            </div>
            Non-Veg
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Items */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="nearby" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="nearby" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Nearby Area
              </TabsTrigger>
              <TabsTrigger value="mess" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                College Mess
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nearby" className="space-y-6">
              {nearbyRestaurants.map((restaurant) => renderRestaurant(restaurant))}
            </TabsContent>

            <TabsContent value="mess" className="space-y-3">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Pre-Order from College Mess</CardTitle>
                  <CardDescription>Order in advance for your next meal</CardDescription>
                </CardHeader>
              </Card>
              <div className="grid gap-3">
                {filterItems(messItems).map((item) => renderFoodItem(item, "College Mess"))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <Card className="card-elevated sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add items to get started</p>
                </div>
              ) : (
                <>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-start gap-2 p-2 rounded-lg bg-muted/50">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{item.name}</h5>
                            <p className="text-xs text-muted-foreground">{item.restaurantName}</p>
                            <p className="text-sm font-semibold mt-1">₹{item.price} × {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-semibold min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => addToCart(item, item.restaurantName)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span className="text-success">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-accent">₹{getTotalPrice()}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {orderPlaced ? (
                      <Button className="w-full bg-success hover:bg-success/90" disabled>
                        <Check className="h-4 w-4 mr-2" />
                        Order Placed!
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-accent hover:bg-accent/90"
                        onClick={placeOrder}
                      >
                        Place Order
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
