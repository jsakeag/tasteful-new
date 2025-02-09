import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="flex-1 items-center px-5 py-10 justify-center"
          >
            <View className="flex-1 justify-center w-full">
              <Text className="text-black text-3xl font-bold text-center">
                {item.title}
              </Text>
              <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mt-3">
                {item.description}
              </Text>
            </View>
            <CustomButton
              title={item.buttonText}
              onPress={() => router.replace("./(tabs)/search")}
              className="w-11/12 mt-auto mb-10"
            />
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Home;
