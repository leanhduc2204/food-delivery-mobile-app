import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MenuItem, useRestaurant } from "@/hooks/useRestaurants";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft,
  Clock,
  Heart,
  MapPin,
  Minus,
  Phone,
  Plus,
  Star,
} from "lucide-react-native";
import { useState } from "react";

export default function RestaurantDetailScreen() {
  const { id, name, rating, imageUrl, reviewCount } = useLocalSearchParams();
  const router = useRouter();
  const { data: restaurant, isLoading, error } = useRestaurant(id as string);

  const { cartItems, addItem, getItemCount, getTotalPrice, removeItem } =
    useCartStore();
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleAddItem = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: id as string,
    });
  };

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <View className="flex-row">
        <Image
          source={{
            uri:
              item.imageUrl ??
              "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="h-20 w-20 rounded-lg"
        />
        <View className="ml-4 flex-1">
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Heart
                color={favorites.has(item.id) ? "#FF5252" : "#9CA3AF"}
                fill={favorites.has(item.id) ? "#FF5252" : "none"}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text className="mt-1 text-sm text-gray-500">{item.description}</Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="font-bold text-green-600">
              ${item.price.toFixed(2)}
            </Text>

            {cartItems.find((cartItem) => cartItem.id === item.id) ? (
              <View className="flex-row items-center rounded-full bg-green-100">
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  className="h-8 w-8 items-center justify-center"
                >
                  <Minus size={16} color="#4CAF50" />
                </TouchableOpacity>
                <Text className="mx-2 font-medium">
                  {
                    cartItems.find((cartItem) => cartItem.id === item.id)
                      ?.quantity
                  }
                </Text>
                <TouchableOpacity
                  onPress={() => handleAddItem(item)}
                  className="h-8 w-8 items-center justify-center"
                >
                  <Plus size={16} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleAddItem(item)}
                className="rounded-full bg-green-500 px-4 py-2"
              >
                <Text className="text-sm font-medium text-white">Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image */}
        <View className="relative h-64">
          <Image
            source={{ uri: imageUrl as string }}
            className="h-full w-full object-cover"
          />
          <View className="absolute left-4 right-4 top-12 flex-row justify-between">
            <TouchableOpacity
              className="rounded-full bg-white p-2 shadow-sm"
              onPress={() => router.back()}
            >
              <ArrowLeft color="#000" size={20} />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-full bg-white p-2 shadow-sm">
              <Heart color="#9CA3AF" fill="none" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Restaurant Info */}
        <View className="relative z-10 -mt-6 rounded-t-3xl bg-white p-4 shadow-lg">
          <Text className="text-2xl font-bold text-gray-800">
            {restaurant?.name || name}
          </Text>

          <View className="mt-2 flex-row items-center">
            <View className="mr-4 flex-row items-center">
              <Star color="#FFC107" fill="#FFC107" size={16} />
              <Text className="ml-1 font-medium text-gray-700">
                {restaurant?.rating ?? rating ?? 5}
              </Text>
              <Text className="ml-1 text-gray-500">
                ({restaurant?.reviewCount ?? reviewCount ?? 1})
              </Text>
            </View>

            <View className="flex-row items-center">
              <Clock color="#6B7280" size={16} />
              <Text className="ml-1 text-gray-700">{"10-20 mins"}</Text>
            </View>
          </View>

          <View className="mt-2 flex-row flex-wrap">
            {restaurant?.categories?.map((category, index) => (
              <View
                key={index}
                className="mb-2 mr-2 rounded-full bg-green-100 px-3 py-1"
              >
                <Text className="text-sm text-green-800">{category.name}</Text>
              </View>
            ))}
          </View>

          <Text className="mt-3 text-gray-600">{restaurant?.description}</Text>

          <View className="mt-4 flex-row border-t border-gray-100 pt-4">
            <View className="mr-6 flex-row items-center">
              <MapPin color="#6B7280" size={16} />
              <Text className="ml-1 text-sm text-gray-700">{"1 km"}</Text>
            </View>
            <View className="flex-row items-center">
              <Phone color="#6B7280" size={16} />
              <Text className="ml-1 text-sm text-gray-700">
                {restaurant?.phone ?? "123-456-7890"}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Categories */}
        <View className="mt-4 px-4">
          {/* Loading State for Menu */}
          {isLoading && !restaurant && (
            <ActivityIndicator size="small" color="#f97316" className="mt-4" />
          )}

          {restaurant?.categories?.map((category) => (
            <View key={category.id} className="mb-6">
              <Text className="mb-3 text-xl font-bold text-gray-800">
                {category.name}
              </Text>
              <FlatList
                data={category.menuItems}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ))}

          {restaurant &&
            (!restaurant.categories || restaurant.categories.length === 0) && (
              <Text className="mt-4 text-center text-gray-500">
                No menu items available.
              </Text>
            )}
        </View>
      </ScrollView>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <View className="absolute bottom-8 left-5 right-5">
          <TouchableOpacity
            onPress={() => router.push("/modal")}
            className="flex-row items-center justify-between rounded-xl bg-orange-500 p-4 shadow-lg"
          >
            <View className="rounded bg-white/20 px-2 py-1">
              <Text className="font-bold text-white">{itemCount}</Text>
            </View>
            <Text className="text-lg font-bold text-white">View Cart</Text>
            <Text className="text-lg font-bold text-white">
              ${totalPrice.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
