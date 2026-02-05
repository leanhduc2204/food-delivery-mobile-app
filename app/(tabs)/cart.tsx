import { CartItem, useCartStore } from "@/store/cartStore";
import { Stack } from "expo-router";
import {
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  Tag,
  Truck,
  X,
} from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CartScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    items: cartItems,
    restaurant,
    increaseQty,
    decreaseQty,
    removeItem,
    updateSpecialInstructions,
    totalPrice,
  } = useCartStore();

  // State for promo code
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "FOOD10") {
      setDiscountApplied(true);
    }
  };

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
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
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

        {/* Promo Code */}
        <View className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-bold text-gray-800">
            Apply Promo Code
          </Text>
          <View className="flex-row">
            <TextInput
              className="flex-1 rounded-l-lg border border-gray-200 px-4 py-3 text-gray-700"
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity
              className={`rounded-r-lg px-6 py-3 ${discountApplied ? "bg-gray-300" : "bg-green-500"}`}
              disabled={discountApplied}
              onPress={applyPromoCode}
            >
              <Text
                className={`font-bold ${discountApplied ? "text-gray-500" : "text-white"}`}
              >
                {discountApplied ? "Applied" : "Apply"}
              </Text>
            </TouchableOpacity>
          </View>
          {!discountApplied && (
            <Text className="mt-2 text-sm text-green-600">
              Try "FOOD10" for 10% off
            </Text>
          )}
        </View>

        {/* Delivery Options */}
        <View className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-bold text-gray-800">
            Delivery Options
          </Text>

          <TouchableOpacity
            className={`flex-row items-center rounded-lg border p-3 ${deliveryOption === "standard" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            onPress={() => setDeliveryOption("standard")}
          >
            <Truck
              color={deliveryOption === "standard" ? "#4CAF50" : "#9CA3AF"}
              size={20}
            />
            <View className="ml-3 flex-1">
              <Text className="font-medium text-gray-800">
                Standard Delivery
              </Text>
              <Text className="text-sm text-gray-500">30-45 min • $2.99</Text>
            </View>
            {deliveryOption === "standard" && (
              <View className="h-5 w-5 items-center justify-center rounded-full bg-green-500">
                <View className="h-2 w-2 rounded-full bg-white"></View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className={`mt-3 flex-row items-center rounded-lg border p-3 ${deliveryOption === "express" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            onPress={() => setDeliveryOption("express")}
          >
            <Clock
              color={deliveryOption === "express" ? "#4CAF50" : "#9CA3AF"}
              size={20}
            />
            <View className="ml-3 flex-1">
              <Text className="font-medium text-gray-800">
                Express Delivery
              </Text>
              <Text className="text-sm text-gray-500">15-25 min • $5.99</Text>
            </View>
            {deliveryOption === "express" && (
              <View className="h-5 w-5 items-center justify-center rounded-full bg-green-500">
                <View className="h-2 w-2 rounded-full bg-white"></View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Delivery Address */}
        <View className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-bold text-gray-800">
            Delivery Address
          </Text>
          <TouchableOpacity className="flex-row items-center rounded-lg bg-gray-50 p-3">
            <MapPin color="#4CAF50" size={20} />
            <View className="ml-3 flex-1">
              <Text className="font-medium text-gray-800">Home</Text>
              <Text className="text-sm text-gray-500">
                123 Main Street, Apartment 4B
              </Text>
            </View>
            <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View className="mb-4 mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-bold text-gray-800">
            Payment Method
          </Text>
          <TouchableOpacity className="flex-row items-center rounded-lg bg-gray-50 p-3">
            <CreditCard color="#4CAF50" size={20} />
            <View className="ml-3 flex-1">
              <Text className="font-medium text-gray-800">Credit Card</Text>
              <Text className="text-sm text-gray-500">**** **** **** 1234</Text>
            </View>
            <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Order Summary */}
      <View className="border-t border-gray-200 bg-white p-4">
        <View className="mb-4">
          <View className="mb-2 flex-row justify-between">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="text-gray-800">${totalPrice().toFixed(2)}</Text>
          </View>

          <View className="mb-2 flex-row justify-between">
            <Text className="text-gray-600">Delivery Fee</Text>
            <Text className="text-gray-800">$2.99</Text>
          </View>

          {discountApplied && (
            <View className="mb-2 flex-row justify-between">
              <View className="flex-row items-center">
                <Tag color="#4CAF50" size={16} />
                <Text className="ml-1 text-green-600">Discount</Text>
              </View>
              <Text className="text-green-600">$1.00</Text>
            </View>
          )}

          <View className="mt-3 flex-row justify-between border-t border-gray-200 pt-3">
            <Text className="text-lg font-bold text-gray-800">Total</Text>
            <Text className="text-lg font-bold text-green-600">
              ${(totalPrice() + 2.99 - 1).toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="items-center rounded-full bg-green-500 py-4">
          <Text className="text-lg font-bold text-white">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
