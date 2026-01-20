import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RestaurantProps {
  id: string;
  name: string;
  rating: number;
  categories: string[];
  deliveryTime: string;
  imageUrl: string; // We'll use remote URLs for now
}

export default function RestaurantCard({
  id,
  name,
  rating,
  categories,
  deliveryTime,
  imageUrl,
}: RestaurantProps) {
  return (
    <Link
      href={{
        pathname: "/restaurant/[id]" as any,
        params: {
          id: id || "1",
          name,
          rating,
          deliveryTime,
          imageUrl,
          categories: categories.join(","),
        },
      }}
      asChild
    >
      <TouchableOpacity className="mb-6 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <Image
          source={{ uri: imageUrl }}
          className="h-48 w-full object-cover"
        />

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-lg font-bold text-gray-900">{name}</Text>
            <View className="flex-row items-center bg-green-100 px-2 py-1 rounded-lg">
              <FontAwesome name="star" size={14} color="green" />
              <Text className="text-green-700 font-bold ml-1 text-xs">
                {rating}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-gray-500 text-sm">
              {categories.join(" • ")}
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-md mr-3">
              <FontAwesome name="clock-o" size={12} color="gray" />
              <Text className="text-gray-600 text-xs ml-1">{deliveryTime}</Text>
            </View>
            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-md">
              <Text className="text-xs text-orange-500 font-bold">
                Free Delivery
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
