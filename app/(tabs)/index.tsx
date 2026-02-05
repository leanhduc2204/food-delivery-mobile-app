import { Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategoryCard from "@/components/common/CategoryCard";
import DishCard from "@/components/common/DishCard";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { useGlobalCategories } from "@/hooks/useGlobalCategories";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useRouter } from "expo-router";
import { ChevronRight, Filter, MapPin, Search } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data: restaurants, isLoading, error } = useRestaurants();
  const {
    data: globalCategories,
    isLoading: globalCategoriesLoading,
    error: globalCategoriesError,
  } = useGlobalCategories();

  // Mock data for popular dishes
  const popularDishes = [
    {
      id: "1",
      name: "Classic Cheeseburger",
      restaurant: "Burger Palace",
      price: "$8.99",
      image:
        "https://images.unsplash.com/photo-1648580852350-3098af89f110?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVsaWNpb3VzJTIwZm9vZCUyMG1lYWx8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      name: "Margherita Pizza",
      restaurant: "Pizza Corner",
      price: "$12.99",
      image:
        "https://images.unsplash.com/photo-1712026063351-61d52c2e4abb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FzdWFsJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "3",
      name: "California Roll",
      restaurant: "Sushi Heaven",
      price: "$9.99",
      image:
        "https://images.unsplash.com/photo-1718808094109-4d24bd3ac5de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TW9kZXJuJTIwdXJiYW4lMjByZXN0YXVyYW50fGVufDB8fDB8fHww",
    },
    {
      id: "4",
      name: "Chicken Tacos",
      restaurant: "Taco Fiesta",
      price: "$7.99",
      image:
        "https://images.unsplash.com/photo-1726533765356-2608b035ff6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T3V0ZG9vciUyMHBhdGlvJTIwZGluaW5nfGVufDB8fDB8fHww",
    },
  ];

  if (isLoading || globalCategoriesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (error || globalCategoriesError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">
          Failed to load restaurants or global categories
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
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
          <TouchableOpacity
            className="flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-3"
            onPress={() => router.push("/browse")}
            activeOpacity={0.7}
          >
            <Search color="#888" size={20} />
            <Text className="ml-3 flex-1 text-gray-500">
              Search for restaurants or dishes...
            </Text>
          </TouchableOpacity>
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
            data={globalCategories}
            renderItem={({ item }) => <CategoryCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
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
                <RestaurantCard key={item.id} item={item} />
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

          <View className="pb-6 pl-4">
            <FlatList
              data={popularDishes}
              renderItem={({ item }) => <DishCard item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
