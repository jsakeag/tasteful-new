import { Image, ImageBackground, Text, View } from "react-native";

import { icons } from "@/constants";
import { useRestaurantStore, useLocationStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const ConfirmRestaurant = () => {
  {
    /*const { selectedRestaurants } = useRestaurantStore();*/
  }
  {
    /*const selectedRestaurant = selectedRestaurants[0];*/
  }
  const selectedRestaurant = {
    title: "Carrot Restaurant",
    rating: 4.5,
    price: 2,
    time: 10,
    car_seats: 2,
  };
  const sampleUri2 = {
    uri: "https://s3-media0.fl.yelpcdn.com/bphoto/fulpjkMZVhAB9sA3wkdtQA/o.jpg",
  };
  return (
    <ImageBackground
      source={sampleUri2}
      className="w-full h-full"
      resizeMode="cover"
      blurRadius={10}
    >
      <SafeAreaView className="bg-black/50 w-full h-full p-5">
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3 text-white text-center">
            Restaurant Found!
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-10">
            <Image source={sampleUri2} className="w-full h-52 rounded-3xl" />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold text-white">
                {selectedRestaurant?.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular text-white">
                  {selectedRestaurant?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">
                Restaurant Price
              </Text>
              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                ${selectedRestaurant?.price}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
              <Text className="text-lg font-JakartaRegular">
                a{selectedRestaurant?.time!}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Car Seats</Text>
              <Text className="text-lg font-JakartaRegular">
                a{selectedRestaurant?.car_seats}
              </Text>
            </View>
          </View>

          <View className="mt-auto w-full">
            <CustomButton
              title="Continue"
              className="w-full mb-3 bg-lime-300 text-white hover:bg-lime-500"
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
