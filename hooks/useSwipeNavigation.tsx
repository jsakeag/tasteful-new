import { useRouter } from "expo-router";
import { useEffect } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export const useSwipeNavigation = () => {
  const router = useRouter();

  const swipeLeft = Gesture.Fling()
    .direction(1) // Left
    .onEnd(() => {
      router.push("./(tabs)/group"); // Change to the next screen
    });

  const swipeRight = Gesture.Fling()
    .direction(2) // Right
    .onEnd(() => {
      router.push("./(tabs)/search"); // Change to the previous screen
    });

  return GestureDetector({ gesture: Gesture.Race(swipeLeft, swipeRight) });
};
