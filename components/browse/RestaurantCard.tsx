import { Restaurant } from "@/hooks/useRestaurants";
import { Link } from "expo-router";
import { Award, Clock, MapPin, Star, TrendingUp } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RestaurantCardProps extends Restaurant {
  featured?: boolean;
  promoted?: boolean;
  deliveryTime?: string;
  distance?: string;
  deliveryFee?: string;
}

const RestaurantCard = ({ item }: { item: RestaurantCardProps }) => {
  return (
    <Link
      asChild
      href={{
        pathname: "/restaurant/[id]" as any,
        params: {
          id: item.id,
          name: item.name,
          rating: item.rating,
          viewCount: item.viewCount,
          image: item.image,
          globalCategoryLinks: item.globalCategoryLinks[0].globalCategory.name,
        },
      }}
    >
      <TouchableOpacity className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="h-40 w-full"
            resizeMode="cover"
          />
          {item.featured && (
            <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-amber-500 px-2 py-1">
              <Award color="white" size={14} />
              <Text className="ml-1 text-xs font-medium text-white">
                Featured
              </Text>
            </View>
          )}
          {item.promoted && (
            <View className="absolute right-3 top-3 flex-row items-center rounded-full bg-green-500 px-2 py-1">
              <TrendingUp color="white" size={14} />
              <Text className="ml-1 text-xs font-medium text-white">
                Promoted
              </Text>
            </View>
          )}
        </View>

        <View className="p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">
                {item.name}
              </Text>
              <Text className="mt-1 text-sm text-gray-500">
                {item.globalCategoryLinks[0].globalCategory.name}
              </Text>
            </View>
            <View className="flex-row items-center rounded-full bg-green-50 px-2 py-1">
              <Star color="#FFC107" fill="#FFC107" size={14} />
              <Text className="ml-1 text-sm font-medium text-green-800">
                {item.rating}
              </Text>
              <Text className="ml-1 text-xs text-green-600">
                ({item.viewCount})
              </Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Clock color="#8BC34A" size={16} />
              <Text className="ml-1 text-sm text-gray-600">
                {item.deliveryTime ?? "10-20 mins"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MapPin color="#8BC34A" size={16} />
              <Text className="ml-1 text-sm text-gray-600">
                {item.distance ?? "1 km"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600">
                Delivery: {item.deliveryFee ?? "Free"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default RestaurantCard;
