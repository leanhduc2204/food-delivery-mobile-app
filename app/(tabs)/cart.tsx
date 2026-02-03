import { CartItem, useCartStore } from "@/store/cartStore";
import { Stack } from "expo-router";
import { Minus, Plus, X } from "lucide-react-native";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const {
    items: cartItems,
    restaurant,
    increaseQty,
    decreaseQty,
    removeItem,
    updateSpecialInstructions,
  } = useCartStore();

  console.log("cartItems", JSON.stringify(cartItems, null, 2));

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return (
      <View className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <View className="flex-row">
          <Image
            source={{ uri: item.imageUrl }}
            className="h-20 w-20 rounded-lg"
          />
          <View className="ml-4 flex-1">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-lg font-bold text-gray-800">
                  {item.name}
                </Text>
                <Text className="mt-1 text-gray-500">{restaurant?.name}</Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <X color="#9CA3AF" size={20} />
              </TouchableOpacity>
            </View>

            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-row items-center rounded-full bg-green-100">
                <TouchableOpacity
                  onPress={() => decreaseQty(item.id)}
                  className="h-8 w-8 items-center justify-center"
                >
                  <Minus size={16} color="#4CAF50" />
                </TouchableOpacity>
                <Text className="mx-2 font-medium">{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => increaseQty(item.id)}
                  className="h-8 w-8 items-center justify-center"
                >
                  <Plus size={16} color="#4CAF50" />
                </TouchableOpacity>
              </View>

              <Text className="font-bold text-green-600">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-3">
          <TextInput
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
            placeholder="Add special instructions..."
            value={item.specialInstructions}
            onChangeText={(text) => updateSpecialInstructions(item.id, text)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800">Your Cart</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Cart Items */}
        <View className="mt-4">
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
