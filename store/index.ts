import { create } from "zustand";

import { RestaurantStore, LocationStore } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if restaurant is selected and now new location is set, clear the selected restaurant
    const { selectedRestaurants, setSelectedRestaurants } =
      useRestaurantStore.getState();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurants: null,
  setSelectedRestaurants: (restaurantId: number[]) =>
    set(() => ({ selectedRestaurants: restaurantId })),
  clearSelectedRestaurant: () => set(() => ({ selectedRestaurants: null })),
}));
