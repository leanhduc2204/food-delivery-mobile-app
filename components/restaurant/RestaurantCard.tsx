import { Category } from "@/hooks/useCategories";
import { Link } from "expo-router";
import { Clock, Star } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RestaurantProps {
  id: string;
  name: string;
  rating?: number;
  categories: Category[];
  imageUrl: string;
  reviewCount?: number;
}

export default function RestaurantCard({
  id,
  name,
  rating,
  reviewCount,
  categories,
  imageUrl = "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2230&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: RestaurantProps) {
  return (
    <Link
      href={{
        pathname: "/restaurant/[id]" as any,
        params: {
          id: id || "1",
          name,
          rating,
          reviewCount,
          imageUrl,
          categories: categories.map((category) => category.name).join(","),
        },
      }}
      asChild
    >
      <TouchableOpacity className="mb-4 mr-4 w-[280px] rounded-2xl bg-white shadow-sm">
        <Image
          source={{
            uri: imageUrl,
          }}
          className="h-40 w-full rounded-t-2xl"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800">{name}</Text>
          <View className="mt-1 flex-row items-center">
            <Star color="#FFC107" fill="#FFC107" size={16} />
            <Text className="ml-1 text-gray-600">{rating ?? 5}</Text>
            <Text className="mx-2 text-gray-400">•</Text>
            <Clock color="#8BC34A" size={16} />
            <Text className="ml-1 text-gray-600">{"10-20 mins"}</Text>
          </View>
          <View className="mt-3 flex-row justify-between">
            <Text className="text-gray-500">
              {categories.map((category) => category.name).join(", ")}
            </Text>
            <Text className="text-gray-500">{"1 km"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
