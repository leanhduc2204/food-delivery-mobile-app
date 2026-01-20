import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Mock Data for Menu
const MENU_ITEMS = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Beef patty, lettuce, tomato, cheese",
    price: 12.99,
  },
  {
    id: "2",
    name: "Cheese Fries",
    description: "Crispy fries topped with melted cheese",
    price: 5.99,
  },
  {
    id: "3",
    name: "Milkshake",
    description: "Vanilla, Chocolate, or Strawberry",
    price: 4.99,
  },
];

import { useCartStore } from "@/store/cartStore";

// ... existing imports

export default function RestaurantDetailScreen() {
  const { id, name, rating, deliveryTime, imageUrl, categories } =
    useLocalSearchParams();
  const router = useRouter();

  const { addItem, getItemCount, getTotalPrice } = useCartStore();
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  const parsedCategories =
    typeof categories === "string" ? categories.split(",") : categories || [];

  const handleAddItem = (item: (typeof MENU_ITEMS)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: id as string,
    });
  };

  return (
    <View className="flex-1 bg-white">
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
            className="w-full h-full object-cover"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white p-2 rounded-full shadow-sm"
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info */}
        <View className="px-5 pt-6 pb-4 bg-white -mt-6 rounded-t-3xl">
          <Text className="text-2xl font-bold text-gray-900 mb-2">{name}</Text>

          <View className="flex-row items-center mb-4">
            <FontAwesome name="star" size={16} color="green" />
            <Text className="text-green-700 font-bold ml-1 mr-4">{rating}</Text>

            <FontAwesome name="clock-o" size={16} color="gray" />
            <Text className="text-gray-600 ml-1 mr-4">{deliveryTime}</Text>

            <Text className="text-gray-500">
              {Array.isArray(parsedCategories)
                ? parsedCategories.join(" • ")
                : parsedCategories}
            </Text>
          </View>

          <View className="h-[1px] bg-gray-200 my-2" />

          <Text className="text-lg font-bold text-gray-900 mt-4 mb-3">
            Menu
          </Text>

          {/* Menu Items */}
          {MENU_ITEMS.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center py-4 border-b border-gray-100"
            >
              <View className="flex-1 pr-4">
                <Text className="text-base font-bold text-gray-900">
                  {item.name}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {item.description}
                </Text>
                <Text className="text-orange-500 font-bold mt-2">
                  ${item.price}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleAddItem(item)}
                className="bg-orange-100 p-3 rounded-xl"
              >
                <FontAwesome name="plus" size={16} color="#f97316" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <View className="absolute bottom-8 left-5 right-5">
          <TouchableOpacity
            onPress={() => router.push("/modal")}
            className="bg-orange-500 p-4 rounded-xl flex-row justify-between items-center shadow-lg"
          >
            <View className="bg-white/20 px-2 py-1 rounded">
              <Text className="text-white font-bold">{itemCount}</Text>
            </View>
            <Text className="text-white font-bold text-lg">View Cart</Text>
            <Text className="text-white font-bold text-lg">
              ${totalPrice.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
