import { Restaurant } from "@/hooks/useRestaurants";
import { Link } from "expo-router";
import { Clock, Star } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RestaurantCard = ({ item }: { item: Restaurant }) => {
  return (
    <Link
      href={{
        pathname: "/restaurant/[id]" as any,
        params: {
          id: item.id || "1",
          name: item.name,
          rating: item.rating,
          viewCount: item.viewCount,
          image: item.image,
          globalCategoryLinks: item.globalCategoryLinks[0].globalCategory.name,
        },
      }}
      asChild
    >
      <TouchableOpacity className="mb-4 mr-4 w-[280px] rounded-2xl bg-white shadow-sm">
        <Image
          source={{
            uri: item.image,
          }}
          className="h-40 w-full rounded-t-2xl"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <View className="mt-1 flex-row items-center">
            <Star color="#FFC107" fill="#FFC107" size={16} />
            <Text className="ml-1 text-gray-600">{item.rating ?? 5}</Text>
            <Text className="mx-2 text-gray-400">•</Text>
            <Clock color="#8BC34A" size={16} />
            <Text className="ml-1 text-gray-600">{"10-20 mins"}</Text>
          </View>
          <View className="mt-3 flex-row justify-between">
            <Text className="text-gray-500">
              {item.globalCategoryLinks[0].globalCategory.name}
            </Text>
            <Text className="text-gray-500">{"1 km"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default RestaurantCard;
