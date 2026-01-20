import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryCard from "@/components/common/CategoryCard";
import RestaurantCard from "@/components/restaurant/RestaurantCard";

const CATEGORIES = [
  { id: "1", name: "Pizza", image: require("@/assets/images/icon.png") },
  { id: "2", name: "Burger", image: require("@/assets/images/icon.png") },
  { id: "3", name: "Sushi", image: require("@/assets/images/icon.png") },
  { id: "4", name: "Asian", image: require("@/assets/images/icon.png") },
];

const RESTAURANTS = [
  {
    id: "1",
    name: "The Burger Joint",
    rating: 4.8,
    categories: ["Burgers", "American"],
    deliveryTime: "15-25 min",
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
  },
  {
    id: "2",
    name: "Sushi Master",
    rating: 4.9,
    categories: ["Japanese", "Sushi"],
    deliveryTime: "30-45 min",
    imageUrl:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
  },
  {
    id: "3",
    name: "Pizza Paradise",
    rating: 4.5,
    categories: ["Italian", "Pizza"],
    deliveryTime: "20-30 min",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-gray-500 text-sm">Deliver to</Text>
          <View className="flex-row items-center">
            <Text className="text-xl font-bold text-gray-900 mr-2">
              New York, USA
            </Text>
            <FontAwesome name="chevron-down" size={14} color="#f97316" />
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 py-4">
          <View className="bg-gray-100 flex-row items-center px-4 py-3 rounded-xl border border-gray-200">
            <FontAwesome name="search" size={20} color="gray" />
            <TextInput
              placeholder="Restaurants, food, drinks"
              className="flex-1 ml-3 text-base text-gray-700"
            />
            <FontAwesome name="sliders" size={20} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <View className="pl-4 pb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="overflow-visible"
          >
            {CATEGORIES.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                image={cat.image}
                isSelected={index === 0}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Header */}
        <View className="px-4 mb-4 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-900">
            Featured Restaurants
          </Text>
          <Text className="text-orange-500 text-sm font-bold">See all</Text>
        </View>

        {/* Mobile Cards */}
        <View className="px-4 pb-20">
          {RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
