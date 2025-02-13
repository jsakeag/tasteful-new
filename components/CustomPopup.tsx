import React, { useRef } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

import { Animated } from "react-native";
import { useEffect } from "react";
import { icons } from "@/constants";
import CustomButton from "./CustomButton";
import { Restaurant } from "@/types/type";

const CustomPopup = ({
  selectedRestaurants,
  visible,
  onClose,
  onNavigate,
}: {
  selectedRestaurants: Restaurant[];
  visible: boolean;
  onClose: () => void;
  onNavigate: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          }}
          className="w-11/12 bg-white p-6 rounded-3xl shadow-2xl items-center"
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-red-400 rounded-full justify-center items-center"
          >
            <Text className="text-white text-lg font-bold">X</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-2xl font-JakartaBold text-gray-800 mb-4">
            {"Your Restaurants"}
          </Text>

          {/* Content */}
          <View className="w-full">
            <>
              <Text className="text-xl font-JakartaSemiBold mb-3 text-center">
                Restaurants Chosen
              </Text>
              <FlatList
                data={selectedRestaurants}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "center" }} // ✅ Ensures columns are centered
                className="max-h-96"
                renderItem={({ item }) => (
                  <View className="flex-1 items-center p-4">
                    {/* ✅ flex-1 for equal column width */}
                    <Image
                      source={{ uri: item.image_url }}
                      className="w-28 h-28 rounded-full"
                    />
                    <Text className="mt-2 text-center">{item.name}</Text>
                    {/* ✅ Ensures text stays centered */}
                    <View className="flex flex-col w-full items-center justify-center">
                      <View className="flex flex-row items-center justify-center space-x-2">
                        <Text className="text-lg font-JakartaSemiBold">
                          {item.rating}
                        </Text>

                        <View className="flex flex-row items-center space-x-0.5">
                          <Image
                            source={icons.star}
                            className="w-5 h-5"
                            resizeMode="contain"
                          />
                        </View>
                      </View>

                      <Text className="text-sm font-JakartaRegular">
                        {Math.round(item.distance)} km
                      </Text>
                    </View>
                  </View>
                )}
              />

              <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
                {/* Total Restaurants */}
                <View className="flex flex-row items-center justify-between w-full py-1">
                  <Text className="text-lg font-JakartaRegular">
                    Total Restaurants:
                  </Text>
                  <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                    {selectedRestaurants.length}
                  </Text>
                </View>

                {/* Members */}
                <View className="flex flex-row items-center justify-between w-full py-1">
                  <Text className="text-lg font-JakartaRegular">Members:</Text>
                  <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                    {selectedRestaurants.length}
                  </Text>
                </View>
              </View>

              <CustomButton
                title="Ready"
                onPress={onNavigate}
                className="w-11/12 mt-6 mb-10 border-t-5"
              />
            </>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomPopup;
