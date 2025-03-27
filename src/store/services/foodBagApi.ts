import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockFoodBags } from "../mockData";

export interface FoodBag {
  id: string;
  storeName: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  distance: number;
  pickupTime: {
    start: string;
    end: string;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl: string;
  foodType: string[];
  dietaryInfo: string[];
  quantity: number;
}

export interface SearchParams {
  query?: string;
  sortBy?: string;
  pickupTimeStart?: number;
  pickupTimeEnd?: number;
  pickupDay?: string;
  foodTypes?: string[];
  dietPreferences?: string[];
  lat?: number;
  lng?: number;
}

// Mock API implementation
const mockApiCall = (params: SearchParams): Promise<FoodBag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredBags = [...mockFoodBags];

      // Apply search query filter
      if (params.query && params.query.trim() !== "") {
        const searchTerm = params.query.toLowerCase().trim();
        filteredBags = filteredBags.filter(
          (bag) =>
            bag.storeName.toLowerCase().includes(searchTerm) ||
            bag.title.toLowerCase().includes(searchTerm) ||
            bag.description.toLowerCase().includes(searchTerm) ||
            bag.foodType.some((type) => type.toLowerCase().includes(searchTerm))
        );
      }

      // Apply food type filters
      if (params.foodTypes && params.foodTypes.length > 0) {
        filteredBags = filteredBags.filter((bag) =>
          bag.foodType.some((type) => params.foodTypes?.includes(type))
        );
      }

      // Apply dietary preference filters
      if (params.dietPreferences && params.dietPreferences.length > 0) {
        filteredBags = filteredBags.filter((bag) =>
          bag.dietaryInfo.some((diet) => params.dietPreferences?.includes(diet))
        );
      }

      // Apply sorting
      if (params.sortBy) {
        switch (params.sortBy) {
          case "distance":
            filteredBags.sort((a, b) => a.distance - b.distance);
            break;
          case "price":
            filteredBags.sort((a, b) => a.price - b.price);
            break;
          case "rating":
            filteredBags.sort((a, b) => b.rating - a.rating);
            break;
          // Default to relevance (no sorting)
          default:
            break;
        }
      }

      resolve(filteredBags);
    }, 300); // Reduced delay for better UX
  });
};

export const foodBagApi = createApi({
  reducerPath: "foodBagApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getFoodBags: builder.query<FoodBag[], SearchParams>({
      queryFn: async (params) => {
        try {
          const data = await mockApiCall(params);
          return { data };
        } catch (error) {
          return { error: { status: 500, data: error } };
        }
      },
    }),
    getFoodBagById: builder.query<FoodBag, string>({
      query: (id) => `/food-bags/${id}`,
    }),
  }),
});

export const { useGetFoodBagsQuery, useGetFoodBagByIdQuery } = foodBagApi;
