import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortOption = "relevance" | "distance" | "price" | "rating";
export type FoodType = "bread" | "meals" | "groceries" | "drinks";
export type DietPreference = "vegetarian" | "vegan";

interface FiltersState {
  searchQuery: string;
  sortBy: SortOption;
  pickupTimeRange: [number, number];
  pickupDay: "today" | "tomorrow";
  foodTypes: FoodType[];
  dietPreferences: DietPreference[];
}

const initialState: FiltersState = {
  searchQuery: "",
  sortBy: "relevance",
  pickupTimeRange: [12, 18],
  pickupDay: "today",
  foodTypes: [],
  dietPreferences: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setPickupTimeRange: (state, action: PayloadAction<[number, number]>) => {
      state.pickupTimeRange = action.payload;
    },
    setPickupDay: (state, action: PayloadAction<"today" | "tomorrow">) => {
      state.pickupDay = action.payload;
    },
    toggleFoodType: (state, action: PayloadAction<FoodType>) => {
      const index = state.foodTypes.indexOf(action.payload);
      if (index === -1) {
        state.foodTypes.push(action.payload);
      } else {
        state.foodTypes.splice(index, 1);
      }
    },
    toggleDietPreference: (state, action: PayloadAction<DietPreference>) => {
      const index = state.dietPreferences.indexOf(action.payload);
      if (index === -1) {
        state.dietPreferences.push(action.payload);
      } else {
        state.dietPreferences.splice(index, 1);
      }
    },
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setSearchQuery,
  setSortBy,
  setPickupTimeRange,
  setPickupDay,
  toggleFoodType,
  toggleDietPreference,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
