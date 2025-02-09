import { create } from "zustand";

import { RestaurantStore, LocationStore, Restaurant } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userCity: null,
  setUserCity: (city: string) => {
    set(() => ({ userCity: city }));
  },
}));

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurants: [],
  selectRestaurant: (restaurantData: Restaurant) => {
    console.log(restaurantData);
    set((state) => ({
      selectedRestaurants: [...state.selectedRestaurants, restaurantData], // Add the restaurantData
    }));
  },
  deselectRestaurant: (restaurantId: string) =>
    set((state) => ({
      selectedRestaurants: state.selectedRestaurants.filter(
        (rest) => rest.id !== restaurantId
      ), // Remove the Restaurant object with the corresponding restaurantId
    })),
  clearSelectedRestaurant: () => set(() => ({ selectedRestaurants: [] })),
}));
