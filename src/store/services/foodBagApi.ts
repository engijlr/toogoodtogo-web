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
  console.log("params", params);
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredBags = [...mockFoodBags];

      // Apply filters
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredBags = filteredBags.filter(
          (bag) =>
            bag.storeName.toLowerCase().includes(query) ||
            bag.title.toLowerCase().includes(query)
        );
      }

      if (params.foodTypes?.length) {
        filteredBags = filteredBags.filter((bag) =>
          bag.foodType.some((type) => params.foodTypes?.includes(type))
        );
      }

      if (params.dietPreferences?.length) {
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
        }
      }

      resolve(filteredBags);
    }, 500); // Simulate network delay
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
