import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RestaurantCard from "@/components/RestaurantCard";
import { useLocationStore, useRestaurantStore } from "@/store";

import axios from "axios";
import { Restaurant } from "@/types/type";
import { icons } from "@/constants";

const Home = () => {
  let { selectedRestaurants } = useRestaurantStore();
  let [restaurantData, setRestaurantData] = useState([]);

  const ListHeaderComponent = () => {
    return (
      <>
        <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-2xl font-JakartaExtraBold">Select 🍽️</Text>
        </View>
        <Text className="text-xl font-JakartaBold mt-5 mb-3">
          Restaurants chosen
        </Text>
      </>
    );
  };

  const ListEmptyComponent = () => (
    <View className="flex flex-col items-center justify-center">
      <Text className="text-sm">No restuarants chosen</Text>
    </View>
  );
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={selectedRestaurants}
        renderItem={({ item }) => <Text>${item}</Text>}
        keyExtractor={(item) => item}
        className="px-5"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default Home;
