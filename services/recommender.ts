import { Restaurant } from "@/types/type";
import { useRestaurantStore } from "@/store";

export const selectBestRestaurant = (restaurants: Restaurant[]): Restaurant => {
  const selectedRestaurant = {...restaurants[0]}; //placeholder
  return selectedRestaurant;
};
