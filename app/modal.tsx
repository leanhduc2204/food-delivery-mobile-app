import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";

export default function CartScreen() {
  const {
    items: cartItems,
    removeItem,
    totalPrice,
    clearCart,
    restaurant,
    totalItems,
  } = useCartStore();
  const { addOrder } = useOrderStore();
  const router = useRouter();
  const total = totalPrice();

  const handlePlaceOrder = () => {
    if (totalItems() === 0 || !restaurant?.id) return;

    addOrder(cartItems, total, restaurant.id);
    clearCart();

    router.replace("/order-success");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between border-b border-gray-100 p-4">
        <Text className="text-xl font-bold">Your Cart</Text>
        <TouchableOpacity onPress={() => clearCart()}>
          <Text className="text-sm text-red-500">Clear</Text>
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">Your cart is empty</Text>
          <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <Text className="font-bold text-orange-500">Start Ordering</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between border-b border-gray-100 py-4">
              <View className="flex-1 flex-row items-center">
                <Text className="mr-3 font-bold text-orange-500">
                  {item.quantity}x
                </Text>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500">${item.price}</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-4 font-bold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  className="rounded-full bg-gray-100 p-2"
                >
                  <FontAwesome name="minus" size={12} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View className="border-t border-gray-100 bg-white p-5 pb-10 shadow-lg">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-lg text-gray-500">Total</Text>
            <Text className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="items-center rounded-xl bg-orange-500 py-4 shadow-md"
          >
            <Text className="text-xl font-bold text-white">Place Order</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
