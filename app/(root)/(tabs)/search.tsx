import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RestaurantCard from "@/components/RestaurantCard";
import { useLocationStore, useRestaurantStore } from "@/store";

import axios from "axios";
import { Restaurant } from "@/types/type";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import CustomPopup from "@/components/CustomPopup";
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from "react-native-gesture-handler";

const Home = () => {
  interface RestaurantData {
    businesses: Restaurant[];
  }

  const { setUserCity, userCity } = useLocationStore();
  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    businesses: [],
  });
  let { selectedRestaurants } = useRestaurantStore();
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserCity(`${address[0].city}`);

      console.log(status, userCity);
      console.log(selectedRestaurants);
    })();
  }, [restaurantData]);

  useEffect(() => {
    console.log("button press");
  }, [isPopupVisible]);

  const request_restaurants_options = {
    method: "GET",
    url: `https://api.yelp.com/v3/businesses/search?location=%22${userCity}%22&sort_by=best_match&limit=10`,
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.EXPO_PUBLIC_YELP_API_KEY}`,
    },
  };

  const restaurantSearch = () => {
    if (userCity) {
      axios
        .request(request_restaurants_options)
        .then((res) => {
          setRestaurantData(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      console.log("Error: No location found");
    }
  };

  const swipeGesture = Gesture.Pan().onEnd((event) => {
    // TO DO: Fix gesture handling bug
    try {
      if (event.translationX < -100) {
        console.log("Gesture detected, navigating...");
        router.replace("./group");
      }
    } catch (error) {
      console.error("Error during gesture handling:", error);
    }
  });

  const ListHeaderComponent = () => {
    return (
      <>
        <Text className="text-2xl font-JakartaExtraBold text-center">
          Search
        </Text>
        <Text className="text-sm font-JakartaBold mb-3 text-center">
          Code: ABCD
        </Text>

        <View className="flex flex-row items-center justify-center my-7">
          <Image source={icons.person} className="w-5 h-5 ml-3 mr-3" />
          <Image source={icons.person} className="w-5 h-5 ml-3 mr-3" />
          <Image source={icons.person} className="w-5 h-5 ml-3 mr-3" />
          <TouchableOpacity className="justify-center items-center w-6 h-6 rounded-full bg-green-300 ml-1 mr-1">
            <Text className="text-white">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-JakartaBold mb-3 text-center">
          {userCity ? `Restaurants in ${userCity}` : "Restaurants Near You"}
        </Text>
      </>
    );
  };

  const ListEmptyComponent = () => (
    <View className="flex flex-col items-center justify-center">
      <Text className="text-sm mb-5">
        {userCity
          ? `Hit the green button to search!`
          : "No restaurants found in your area"}
      </Text>
      <TouchableOpacity
        onPress={() => {
          restaurantSearch();
        }}
        className="justify-center items-center w-10 h-10 rounded-full bg-green-300"
      >
        <Image source={icons.search} className="w-4 h-4" />
      </TouchableOpacity>
    </View>
  );

  return (
    //<GestureHandlerRootView>
    //<GestureDetector gesture={swipeGesture}>
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={restaurantData.businesses}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item) => item.id}
        className="px-5 max-h-[90vh] max-h-4/5"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
      {/* Continue Button Popup */}
      {selectedRestaurants.length > 0 && (
        <CustomButton
          title="Continue"
          onPress={() => {
            setPopupVisible(true);
          }}
          className="w-[90%] max-w-[350px] mb-24 mt-auto self-center absolute bottom-5"
        />
      )}
      {/* Modal Popup */}
      <CustomPopup
        selectedRestaurants={selectedRestaurants}
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)} // Close function
        onNavigate={() => router.replace("../confirm")}
      ></CustomPopup>
    </SafeAreaView>
    //</GestureDetector>
    //</GestureHandlerRootView>
  );
};

export default Home;
