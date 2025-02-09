import React, { useRef } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { Animated } from "react-native";
import { useEffect } from "react";
import { icons } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const CustomPopup = ({
  title,
  visible,
  onClose,
}: {
  title: string;
  visible: boolean;
  onClose: () => void;
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
            {title || "Popup"}
          </Text>

          {/* Content */}
          <View className="w-full">
            <>
              <Text className="text-xl font-JakartaSemiBold mb-3">
                Restaurant Information
              </Text>

              <View className="flex flex-col w-full items-center justify-center mt-10">
                {/* <Image
            source={{ uri: selectedRestaurant?.profile_image_url }}
            className="w-28 h-28 rounded-full"
          /> */}

                <View className="flex flex-row items-center justify-center mt-5 space-x-2">
                  <Text className="text-lg font-JakartaSemiBold">
                    a{/*{selectedRestaurant?.title}*/}
                  </Text>

                  <View className="flex flex-row items-center space-x-0.5">
                    <Image
                      source={icons.star}
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                    <Text className="text-lg font-JakartaRegular">
                      a{/*selectedRestaurant?.rating*/}
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
                    ${/*selectedRestaurant?.price*/}
                  </Text>
                </View>

                <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                  <Text className="text-lg font-JakartaRegular">
                    Pickup Time
                  </Text>
                  <Text className="text-lg font-JakartaRegular">
                    a{/*formatTime(selectedRestaurant?.time!)*/}
                  </Text>
                </View>

                <View className="flex flex-row items-center justify-between w-full py-3">
                  <Text className="text-lg font-JakartaRegular">Car Seats</Text>
                  <Text className="text-lg font-JakartaRegular">
                    a{/*selectedRestaurant?.car_seats*/}
                  </Text>
                </View>
              </View>

              <View className="flex flex-col w-full items-start justify-center mt-5">
                <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
                  <Image source={icons.to} className="w-6 h-6" />
                  <Text className="text-lg font-JakartaRegular ml-2">
                    a{/*userAddress*/}
                  </Text>
                </View>

                <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
                  <Image source={icons.point} className="w-6 h-6" />
                  <Text className="text-lg font-JakartaRegular ml-2">
                    a{/*destinationAddress*/}
                  </Text>
                </View>
                <CustomButton
                  title="Confirm"
                  onPress={() => router.replace("./confirm")}
                  className="w-11/12 mt-auto mb-10"
                />
              </View>
            </>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomPopup;
