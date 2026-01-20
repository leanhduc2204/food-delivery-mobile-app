import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";

export default function CartScreen() {
  const { items, removeItem, getTotalPrice, clearCart, restaurantId } =
    useCartStore();
  const { addOrder } = useOrderStore();
  const router = useRouter();
  const total = getTotalPrice();

  const handlePlaceOrder = () => {
    if (items.length === 0 || !restaurantId) return;

    addOrder(items, total, restaurantId);
    clearCart();

    // Use replace to prevent going back to cart from success
    router.replace("/order-success");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-xl font-bold">Your Cart</Text>
        <TouchableOpacity onPress={() => clearCart()}>
          <Text className="text-red-500 text-sm">Clear</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">Your cart is empty</Text>
          <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <Text className="text-orange-500 font-bold">Start Ordering</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <Text className="text-orange-500 font-bold mr-3">
                  {item.quantity}x
                </Text>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 text-base">
                    {item.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">${item.price}</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className="font-bold text-gray-800 mr-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  className="bg-gray-100 p-2 rounded-full"
                >
                  <FontAwesome name="minus" size={12} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {items.length > 0 && (
        <View className="p-5 border-t border-gray-100 bg-white shadow-lg pb-10">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-gray-500 text-lg">Total</Text>
            <Text className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-orange-500 py-4 rounded-xl items-center shadow-md"
          >
            <Text className="text-white font-bold text-xl">Place Order</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
