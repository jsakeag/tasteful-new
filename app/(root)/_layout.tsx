import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "fade", // This will apply when entering the screen
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="join"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="confirm"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default Layout;
