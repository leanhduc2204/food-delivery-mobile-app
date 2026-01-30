import { Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryCard from "@/components/common/CategoryCard";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { useCategories } from "@/hooks/useCategories";
import { useRestaurants } from "@/hooks/useRestaurants";
import { ChevronRight, Filter, MapPin, Search } from "lucide-react-native";

export default function HomeScreen() {
  const { data: restaurants, isLoading, error } = useRestaurants();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  if (isLoading || categoriesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (error || categoriesError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">
          Failed to load restaurants or categories
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="bg-white px-4 pb-4 pt-2">
        <View className="flex-row items-center">
          <MapPin color="#8BC34A" size={20} />
          <Text className="ml-2 font-medium text-gray-700">New York, USA</Text>
          <ChevronRight color="#8BC34A" size={20} />
        </View>
        {/* Search Bar */}
        <View className="mt-4 flex-row">
          <View className="flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-3">
            <Search color="#888" size={20} />
            <TextInput
              className="ml-3 flex-1 text-gray-700"
              placeholder="Search for restaurants or dishes..."
            />
          </View>
          <TouchableOpacity className="ml-3 rounded-full bg-green-500 p-3">
            <Filter color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-6 pb-6 pl-4">
          <Text className="mb-4 text-2xl font-bold text-gray-800">
            Categories
          </Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryCard name={item.name} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mt-6">
          <View className="mb-4 flex-row items-center justify-between px-4">
            <Text className="text-2xl font-bold text-gray-800">
              Featured Restaurants
            </Text>
            <TouchableOpacity>
              <Text className="font-medium text-green-600">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="pb-6 pl-4">
            <FlatList
              data={restaurants}
              renderItem={({ item }) => (
                <RestaurantCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  categories={item.categories || []}
                  imageUrl={item.image}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View className="mt-6">
          <View className="mb-4 flex-row items-center justify-between px-4">
            <Text className="text-2xl font-bold text-gray-800">
              Popular Dishes
            </Text>
            <TouchableOpacity>
              <Text className="font-medium text-green-600">See All</Text>
            </TouchableOpacity>
          </View>

          {/* <FlatList
            data={popularDishes}
            renderItem={renderPopularDish}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
