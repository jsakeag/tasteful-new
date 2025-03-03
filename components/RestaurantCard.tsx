import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { Restaurant } from "@/types/type";
import { useRestaurantStore } from "@/store";

import { database } from '../firebaseConfig';
import { ref, set, get } from "firebase/database";

interface RestaurantCardProps {
  restaurant: Restaurant;
  toggleRestaurantHook: (newRoom: Restaurant) => void;
}

const RestaurantCard = ({ restaurant, toggleRestaurantHook }: RestaurantCardProps) => {
  let { selectedRestaurants, selectRestaurant, deselectRestaurant } =
    useRestaurantStore();
  const toggleRestaurant = (selection: Restaurant) => {
    if (!selectedRestaurants.some((rest) => rest.id === selection.id)) {
      console.log("select");
      selectRestaurant(selection);
    } else {
      console.log(selectedRestaurants, restaurant);
      deselectRestaurant(selection.id);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        toggleRestaurant(restaurant);
        toggleRestaurantHook(restaurant);
      }}
      className={`${
        selectedRestaurants?.some((rest) => rest.id === restaurant.id)
          ? "bg-green-200"
          : "bg-white"
      } flex flex-row items-center justify-center rounded-lg shadow-sm shadow-neutral-300 mb-3 bg-green-300`}
    >
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {parseFloat(restaurant.distance.toFixed(2))} mi
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {restaurant.location.city}
              </Text>
            </View>
          </View>
          <Image
            source={{
              uri: restaurant.image_url,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Name
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {restaurant.name}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Rating
            </Text>
            <Text className="text-md font-JakartaBold">
              {restaurant.rating}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Price
            </Text>
            <Text className="text-md font-JakartaBold">{restaurant.price}</Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between"></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
