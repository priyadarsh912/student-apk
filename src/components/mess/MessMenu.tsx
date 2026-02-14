import { UtensilsCrossed, Users, Clock, Leaf, Drumstick } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodOrdering } from "./FoodOrdering";
import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  type: "veg" | "non-veg";
  popular?: boolean;
}

interface Meal {
  time: string;
  items: MenuItem[];
}

interface DayMenu {
  breakfast: Meal;
  lunch: Meal;
  snacks: Meal;
  dinner: Meal;
}

const todayMenu: DayMenu = {
  breakfast: {
    time: "7:30 AM - 9:30 AM",
    items: [
      { name: "Aloo Paratha", type: "veg", popular: true },
      { name: "Poha", type: "veg" },
      { name: "Boiled Eggs", type: "non-veg" },
      { name: "Bread & Butter", type: "veg" },
      { name: "Tea/Coffee", type: "veg" },
    ],
  },
  lunch: {
    time: "12:30 PM - 2:30 PM",
    items: [
      { name: "Dal Makhani", type: "veg", popular: true },
      { name: "Paneer Butter Masala", type: "veg" },
      { name: "Chicken Curry", type: "non-veg", popular: true },
      { name: "Jeera Rice", type: "veg" },
      { name: "Roti", type: "veg" },
      { name: "Salad & Raita", type: "veg" },
    ],
  },
  snacks: {
    time: "5:00 PM - 6:00 PM",
    items: [
      { name: "Samosa", type: "veg", popular: true },
      { name: "Chai", type: "veg" },
      { name: "Biscuits", type: "veg" },
    ],
  },
  dinner: {
    time: "7:30 PM - 9:30 PM",
    items: [
      { name: "Mix Veg", type: "veg" },
      { name: "Chole", type: "veg" },
      { name: "Egg Curry", type: "non-veg" },
      { name: "Rice", type: "veg" },
      { name: "Roti", type: "veg" },
      { name: "Sweet", type: "veg" },
    ],
  },
};

const crowdLevels = {
  breakfast: "low",
  lunch: "high",
  snacks: "medium",
  dinner: "medium",
};

interface MessMenuProps {
  defaultTab?: string;
}

export function MessMenu({ defaultTab }: MessMenuProps) {
  const getCurrentMeal = () => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 10) return "breakfast";
    if (hour >= 12 && hour < 15) return "lunch";
    if (hour >= 17 && hour < 18) return "snacks";
    if (hour >= 19 && hour < 22) return "dinner";
    return "lunch";
  };

  const [activeTab, setActiveTab] = useState(defaultTab || getCurrentMeal());

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "low":
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "high":
        return "badge-urgent";
      default:
        return "";
    }
  };

  const renderMealCard = (meal: Meal, mealType: keyof typeof crowdLevels) => (
    <Card className="card-elevated">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg capitalize">{mealType}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getCrowdColor(crowdLevels[mealType])}>
              <Users className="h-3 w-3 mr-1" />
              {crowdLevels[mealType]} crowd
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {meal.time}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {meal.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.type === "veg" ? (
                  <div className="h-4 w-4 border-2 border-success rounded flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                ) : (
                  <div className="h-4 w-4 border-2 border-destructive rounded flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                  </div>
                )}
                <span className="font-medium">{item.name}</span>
              </div>
              {item.popular && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <UtensilsCrossed className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Today's Mess Menu</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Badge variant="outline" className="flex items-center gap-1 cursor-pointer hover:bg-muted">
          <Leaf className="h-3 w-3 text-success" />
          Veg
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 cursor-pointer hover:bg-muted">
          <Drumstick className="h-3 w-3 text-destructive" />
          Non-Veg
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="order">Order Food</TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast">
          {renderMealCard(todayMenu.breakfast, "breakfast")}
        </TabsContent>
        <TabsContent value="lunch">
          {renderMealCard(todayMenu.lunch, "lunch")}
        </TabsContent>
        <TabsContent value="snacks">
          {renderMealCard(todayMenu.snacks, "snacks")}
        </TabsContent>
        <TabsContent value="dinner">
          {renderMealCard(todayMenu.dinner, "dinner")}
        </TabsContent>
        <TabsContent value="order">
          <FoodOrdering />
        </TabsContent>
      </Tabs>

      {/* All Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(todayMenu).map(([mealType, meal]) => (
          <div key={mealType}>
            {renderMealCard(meal, mealType as keyof typeof crowdLevels)}
          </div>
        ))}
      </div>
    </div>
  );
}
