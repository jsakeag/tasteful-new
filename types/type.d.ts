import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  rating: number;
  price: string;
  location: {
    address1: string;
    address2: string;
    address3: string;
    city: string;
  };
  distance: number;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface LocationStore {
  userCity: string | null;
  setUserCity: (city: string) => void;
}

declare interface RestaurantStore {
  selectedRestaurants: string[];
  toggleRestaurant: (restaurantId: string) => void;
}
