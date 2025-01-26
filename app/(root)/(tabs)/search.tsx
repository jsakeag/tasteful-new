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
import { useLocationStore } from "@/store";

import axios from "axios";
import { Restaurant } from "@/types/type";

const request_restaurants_options = {
  method: "GET",
  url: "https://api.yelp.com/v3/businesses/search?location=%22NYC%22&sort_by=best_match&limit=10",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${process.env.EXPO_PUBLIC_YELP_API_KEY}`,
  },
};

const Home = () => {
  //const { setUserLocation } = useLocationStore();
  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    businesses: [],
  });

  interface RestaurantData {
    businesses: Restaurant[];
  }

  useEffect(() => {
    if (restaurantData) {
      restaurantData.businesses.forEach((restaurant) => {
        console.log(restaurant.id);
      });
    }
  }, [restaurantData]);

  const restaurantSearch = () => {
    axios
      .request(request_restaurants_options)
      .then((res) => {
        setRestaurantData(res.data);
      })
      .catch((err) => console.error(err));
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-2xl font-JakartaExtraBold">Start 🍴</Text>
          <TouchableOpacity
            onPress={() => {
              restaurantSearch();
            }}
            className="justify-center items-center w-10 h-10 rounded-full bg-green-300"
          ></TouchableOpacity>
        </View>
        <Text className="text-xl font-JakartaBold mt-5 mb-3">
          Your Restaurants
        </Text>
      </>
    );
  };

  const ListEmptyComponent = () => (
    <View className="flex flex-col items-center justify-center">
      <Text className="text-sm">No restaurants found in your area</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={restaurantData.businesses}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item) => item.id}
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
/*
  useEffect(() => {
    (async () => {
      //let { status } = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);*/
