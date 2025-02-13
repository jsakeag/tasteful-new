import { Image, ImageBackground, Text, View, Linking } from "react-native";
import { useEffect } from "react";
import { icons } from "@/constants";
import { useRestaurantStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { selectBestRestaurant } from "@/services/recommender";

const ConfirmRestaurant = () => {
  const { selectedRestaurants } = useRestaurantStore();

  const selectedRestaurant = selectBestRestaurant(selectedRestaurants);
  const openLink = () => {
    Linking.openURL(selectedRestaurant.url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <ImageBackground
      source={{ uri: selectedRestaurant.image_url }}
      className="w-full h-full"
      resizeMode="cover"
      blurRadius={10}
    >
      <SafeAreaView className="bg-black/50 w-full h-full p-5">
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3 text-white text-center">
            Restaurant Found!
          </Text>

          {/* Middle content wrapper with flex-1 to center it with details */}
          <View className="flex-1 w-full items-center justify-center">
            <Image
              source={{ uri: selectedRestaurant.image_url }}
              className="w-full h-52 rounded-3xl"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold text-white">
                {selectedRestaurant.name}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular text-white">
                  {selectedRestaurant.rating}
                </Text>
              </View>
            </View>

            {/* Grouping Restaurant Details with the Middle Content */}
            <View className="w-full mt-5">
              <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                <Text className="text-lg text-white font-JakartaRegular">
                  Restaurant Price
                </Text>
                <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                  ${selectedRestaurant.price}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                <Text className="text-lg text-white font-JakartaRegular">
                  Pickup Time
                </Text>
                <Text className="text-lg text-white font-JakartaRegular">
                  {selectedRestaurant.distance}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between w-full py-3">
                <Text className="text-lg text-white font-JakartaRegular">
                  Reviews
                </Text>
                <Text className="text-lg text-white font-JakartaRegular">
                  {selectedRestaurant.review_count}
                </Text>
              </View>
            </View>
          </View>

          {/* Buttons at the bottom */}
          <View className="mt-auto w-full">
            <CustomButton
              title="Continue"
              className="w-full mb-3 bg-lime-300 text-white hover:bg-lime-500"
              onPress={() => {
                openLink();
              }}
            />
            <CustomButton
              title="Restart"
              className="w-full bg-red-300 text-white hover:bg-red-400"
              onPress={() => {
                router.replace("./join");
              }}
            />
          </View>
        </>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ConfirmRestaurant;
