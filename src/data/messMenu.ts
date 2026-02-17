export type MealItem = {
  item: string;
  type: "VEG" | "NON-VEG" | "BEV" | "INTL" | "SOUTH" | "SPECIAL";
};
export type MealSlot = {
  meal: string;
  time: string;
  icon: string;
  items: MealItem[];
};

export const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const weeklyMenu: Record<string, MealSlot[]> = {
  SUN: [
    {
      meal: "Breakfast",
      time: "08:30 AM - 09:30 AM",
      icon: "wb_sunny",
      items: [
        { item: "Chole Bhature", type: "VEG" },
        { item: "Tea • Pickle • Onion Masala Green Chilli", type: "VEG" },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Sweet Porridge • Banana • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "Veg Biryani • Mix Raita • Jeera Aloo", type: "VEG" },
        { item: "Chapati • Pickle • Green Salad", type: "VEG" },
        {
          item: "🌍 Saute Veg • Pita Bread • Green Peas Hummus • Steamed Rice • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [{ item: "Samosa (Boys) • Namkeen (Girls) • Tea", type: "VEG" }],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [
        { item: "Egg Bhurji • Paneer Makhani • Lobiya Tadak", type: "NON-VEG" },
        { item: "Rice • Green Salad • Chapati • Pickle", type: "VEG" },
        { item: "🇮🇳 Paneer Chattinad • Andra Curry", type: "SOUTH" },
      ],
    },
  ],
  MON: [
    {
      meal: "Breakfast",
      time: "07:30 AM - 09:00 AM",
      icon: "wb_sunny",
      items: [
        { item: "Coleslaw Sandwich • Cornflakes • Tea • Milk", type: "VEG" },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Masala Omelette or Boiled Egg • Cut Fruit • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "Panchmel • Aloo Gobhi • Rice • Boondi Raita", type: "VEG" },
        { item: "Green Salad • Chapati • Pickle", type: "VEG" },
        {
          item: "🌍 Spaghetti Aglio Olio • Veg Stew • Tomato Salsa • Steamed Rice • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [{ item: "Namkeen (Boys) • Samosa (Girls) • Tea", type: "VEG" }],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [
        { item: "Baigan Bharta • Dal Makhani • Jeera Rice", type: "VEG" },
        { item: "Chapati • Green Salad • Pickle • Suji Ka Halwa", type: "VEG" },
        {
          item: "🇮🇳 Tomato Pappu • Ennai Katrikai Kolambu • Lemon Rice",
          type: "SOUTH",
        },
      ],
    },
  ],
  TUE: [
    {
      meal: "Breakfast",
      time: "07:30 AM - 09:00 AM",
      icon: "wb_sunny",
      items: [
        { item: "Subzi Poori • Tea • Pickle", type: "VEG" },
        { item: "Aloo Chana Chaat (Girls Only)", type: "VEG" },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Pancake with Chocolate Sauce • Banana • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "Rajma Raseela • Sev Tamatar • Peas Pulao", type: "VEG" },
        {
          item: "Cucumber Radish Salad • Chapati • Mint Cucumber Raita • Pickle",
          type: "VEG",
        },
        {
          item: "🌍 Pink Sauce Pasta • French Fry • Tomato Ketchup • Steamed Rice • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [{ item: "B-Pakora (Boys) • Chips (Girls) • Tea", type: "VEG" }],
    },
    {
      meal: "Iftar",
      time: "06:15 PM - 07:00 PM",
      icon: "mosque",
      items: [
        {
          item: "🌙 Ramadan Iftar • Rooh Afza • Apple • Aloo Bonda",
          type: "SPECIAL",
        },
      ],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [{ item: "Menu as per regular schedule", type: "VEG" }],
    },
  ],
  WED: [
    {
      meal: "Breakfast",
      time: "07:30 AM - 09:00 AM",
      icon: "wb_sunny",
      items: [
        { item: "Pav Bhaji • Pickle • Milk • Tea", type: "VEG" },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Oats • Banana • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "White Chana Masala • Aloo Gajar Methi • Rice", type: "VEG" },
        { item: "Green Salad • Chapati • Ghiya Raita • Pickle", type: "VEG" },
        {
          item: "🌍 Veg Augratin • Potato Wedges • Basil Salsa • Steamed Rice • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [{ item: "Chips (Boys) • B-Pakora (Girls) • Tea", type: "VEG" }],
    },
    {
      meal: "Iftar",
      time: "06:15 PM - 07:00 PM",
      icon: "mosque",
      items: [
        {
          item: "🌙 Ramadan Iftar • Frooti • Muskmelon • Mix Pakora",
          type: "SPECIAL",
        },
      ],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [
        {
          item: "Matar Paneer • Murgh Kolapuri • G-Moong Jeera Tadka",
          type: "NON-VEG",
        },
        { item: "Rice • Chapati • Pickle • Onion Salad", type: "VEG" },
      ],
    },
  ],
  THU: [
    {
      meal: "Breakfast",
      time: "07:30 AM - 09:00 AM",
      icon: "wb_sunny",
      items: [
        {
          item: "Methi Parantha • Curd • Fat Spread • Tea • Pickle",
          type: "VEG",
        },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Sweet Porridge • Cut Fruit • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "Nutri Matar • Aloo Kadhi • Rice • Fryums", type: "VEG" },
        { item: "Chapati • Pickle", type: "VEG" },
        {
          item: "🌍 French Fries • Beans Fogat • Steamed Rice • Tomato Ketchup • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [
        { item: "Matthi (Boys) • Biscuit • Coffee (Girls) • Tea", type: "VEG" },
      ],
    },
    {
      meal: "Iftar",
      time: "06:15 PM - 07:00 PM",
      icon: "mosque",
      items: [
        {
          item: "🌙 Ramadan Iftar • Milk • Papaya • Bread Pakora",
          type: "SPECIAL",
        },
      ],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [
        { item: "Palak Corn • Maha Chana • Rice • Chapati", type: "VEG" },
        { item: "Salad • Pickle • Semiya Sagoo Payasam", type: "VEG" },
      ],
    },
  ],
  FRI: [
    {
      meal: "Breakfast",
      time: "07:30 AM - 09:00 AM",
      icon: "wb_sunny",
      items: [
        { item: "Namkeen Semiyan • Kinnu • Boiled Egg • Tea", type: "NON-VEG" },
        { item: "Bread • Fat Spread • Jam", type: "VEG" },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Egg Dish As Per Regular Mess Menu • Banana • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "Black Chana Tari Wala • Mushroom Kadhai • Rice", type: "VEG" },
        { item: "Salad • Chapati • Mix Raita • Pickle", type: "VEG" },
        {
          item: "🌍 Veg Hakka Noodle • Veg Patty • Cocktail Sauce • Steamed Rice • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [
        { item: "Biscuit • Coffee (Boys) • Rusk • Tea (Girls)", type: "VEG" },
      ],
    },
    {
      meal: "Iftar",
      time: "06:15 PM - 07:00 PM",
      icon: "mosque",
      items: [
        {
          item: "🌙 Ramadan Iftar • Lahori Jeera • Watermelon • Samosa",
          type: "SPECIAL",
        },
      ],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [{ item: "Menu as per regular schedule", type: "VEG" }],
    },
  ],
  SAT: [
    {
      meal: "Breakfast",
      time: "08:30 AM - 09:30 AM",
      icon: "wb_sunny",
      items: [
        {
          item: "Stuffed Parantha • Fat Spread • Curd • Tea • Pickle",
          type: "VEG",
        },
        {
          item: "🌍 Regular Menu • Bread/Fat Spread Jam • Cornflakes • Cut Fruit • Milk • Tea/Coffee",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Lunch",
      time: "12:00 PM - 01:45 PM",
      icon: "light_mode",
      items: [
        { item: "Chana Dal Fry • Mushroom Kadhai • Rice • Salad", type: "VEG" },
        { item: "Chapati • Cucumber Raita • Pickle", type: "VEG" },
        {
          item: "🌍 Mexican Kidney Beans • Cajun Potato Wedges • Sazda • Steamed Rice • Plain Curd • Banana",
          type: "INTL",
        },
      ],
    },
    {
      meal: "Snacks",
      time: "04:30 PM - 05:15 PM",
      icon: "cookie",
      items: [{ item: "Rusk (Boys) • Matthi (Girls) • Tea", type: "VEG" }],
    },
    {
      meal: "Iftar",
      time: "06:15 PM - 07:00 PM",
      icon: "mosque",
      items: [
        {
          item: "🌙 Ramadan Iftar • Frooti • Apple • Aloo Bonda",
          type: "SPECIAL",
        },
      ],
    },
    {
      meal: "Dinner",
      time: "07:30 PM - 09:00 PM",
      icon: "dark_mode",
      items: [{ item: "Menu as per regular schedule", type: "VEG" }],
    },
  ],
};
