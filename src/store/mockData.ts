import { FoodBag } from "./services/foodBagApi";

export const mockFoodBags: FoodBag[] = [
  {
    id: "1",
    storeName: "Starbucks - Fisketorvet",
    title: "Surprise Bag with Coffee & Pastries",
    description: "A delicious mix of pastries and sandwiches",
    price: 49.0,
    originalPrice: 150.0,
    rating: 4.4,
    distance: 4.2,
    pickupTime: {
      start: "19:30",
      end: "20:00",
    },
    location: {
      lat: 55.676098,
      lng: 12.568337,
      address: "Fisketorvet 2, 1560 Copenhagen",
    },
    imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800",
    foodType: ["bread", "drinks"],
    dietaryInfo: ["vegetarian"],
    quantity: 2,
  },
  {
    id: "2",
    storeName: "Lagkagehuset",
    title: "Danish Pastry Surprise Box",
    description: "Selection of fresh Danish pastries",
    price: 59.0,
    originalPrice: 180.0,
    rating: 4.6,
    distance: 1.8,
    pickupTime: {
      start: "20:00",
      end: "20:30",
    },
    location: {
      lat: 55.67842,
      lng: 12.569355,
      address: "Frederiksberggade 21, 1459 Copenhagen",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
    foodType: ["bread"],
    dietaryInfo: ["vegetarian"],
    quantity: 3,
  },
  {
    id: "3",
    storeName: "Netto",
    title: "Grocery Rescue Box",
    description: "Mixed groceries near expiry",
    price: 39.0,
    originalPrice: 120.0,
    rating: 4.2,
    distance: 2.5,
    pickupTime: {
      start: "19:00",
      end: "21:00",
    },
    location: {
      lat: 55.675245,
      lng: 12.567732,
      address: "Vesterbrogade 89, 1620 Copenhagen",
    },
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    foodType: ["groceries"],
    dietaryInfo: ["vegan"],
    quantity: 5,
  },
  {
    id: "4",
    storeName: "Joe & The Juice",
    title: "Fresh Juice & Sandwich Box",
    description: "Selection of fresh juices and sandwiches",
    price: 45.0,
    originalPrice: 135.0,
    rating: 4.5,
    distance: 3.1,
    pickupTime: {
      start: "20:30",
      end: "21:00",
    },
    location: {
      lat: 55.67789,
      lng: 12.570912,
      address: "Købmagergade 42, 1150 Copenhagen",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=800",
    foodType: ["meals", "drinks"],
    dietaryInfo: ["vegetarian", "vegan"],
    quantity: 4,
  },
];

interface RecommendedBag {
  id: string;
  storeName: string;
  title: string;
  imageUrl: string;
  logoUrl: string;
  rating: number;
  distance: number;
  pickupTime: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

export const recommendedBags: RecommendedBag[] = [
  {
    id: "r1",
    storeName: "Joe & The Juice",
    title: "Fresh Juice & Sandwich Box",
    imageUrl:
      "https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=800",
    logoUrl: "/stores-logo-1.svg",
    rating: 4.5,
    distance: 3.1,
    pickupTime: "20:30 - 21:00",
    price: 45,
    originalPrice: 135,
    quantity: 4,
  },
  {
    id: "r2",
    storeName: "Lagkagehuset",
    title: "Danish Pastry Surprise Box",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
    logoUrl: "/stores-logo-1.svg",
    rating: 4.6,
    distance: 1.8,
    pickupTime: "20:00 - 20:30",
    price: 59,
    originalPrice: 180,
    quantity: 3,
  },
  {
    id: "r3",
    storeName: "Netto",
    title: "Grocery Rescue Box",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    logoUrl: "/stores-logo-1.svg",
    rating: 4.2,
    distance: 2.5,
    pickupTime: "19:00 - 21:00",
    price: 39,
    originalPrice: 120,
    quantity: 5,
  },
  {
    id: "r4",
    storeName: "7-Eleven",
    title: "Midnight Snacks Deal",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
    logoUrl: "/stores-logo-1.svg",
    rating: 4.0,
    distance: 0.9,
    pickupTime: "21:00 - 22:00",
    price: 35,
    originalPrice: 95,
    quantity: 1,
  },
];
