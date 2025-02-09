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
import CustomButton from "@/components/CustomButton";
import CustomPopup from "@/components/CustomPopup";

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

  const ListHeaderComponent = () => {
    return (
      <>
        <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-2xl font-JakartaExtraBold">Select 🍽️</Text>
          <TouchableOpacity
            onPress={() => {
              restaurantSearch();
            }}
            className="justify-center items-center w-10 h-10 rounded-full bg-green-300"
          >
            <Image source={icons.search} className="w-4 h-4" />
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-JakartaBold mt-5 mb-3">
          {userCity ? `Restaurants in ${userCity}` : "Restaurants Near You"}
        </Text>
      </>
    );
  };

  const ListEmptyComponent = () => (
    <View className="flex flex-col items-center justify-center">
      <Text className="text-sm">
        {userCity
          ? `Hit the green button to search!`
          : "No restaurants found in your area"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-general-500 flex-1">
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
      {restaurantData.businesses.length > 0 && (
        <CustomButton
          title="Continue"
          onPress={() => {
            setPopupVisible(true);
          }}
          className="w-10/12 mb-24 mt-auto self-center absolute bottom-5"
        />
      )}
      {/* Modal Popup */}
      <CustomPopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)} // Close function
        title="Confirm Restaurants"
        onNavigate={() => router.replace("../confirm")}
      ></CustomPopup>
    </SafeAreaView>
  );
};

export default Home;
