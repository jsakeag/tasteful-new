import { create } from "zustand";

import { RestaurantStore, LocationStore } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userCity: null,
  setUserCity: (city: string) => {
    set(() => ({ userCity: city }));
  },
}));

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurants: [],
  toggleRestaurant: (restaurantId: string) =>
    set((state) => ({
      selectedRestaurants: state.selectedRestaurants.includes(restaurantId)
        ? state.selectedRestaurants.filter((id) => id !== restaurantId) // Remove the restaurantId
        : [...state.selectedRestaurants, restaurantId], // Add the restaurantId
    })),
  clearSelectedRestaurant: () => set(() => ({ selectedRestaurants: [] })),
}));
