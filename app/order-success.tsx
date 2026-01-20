import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function OrderSuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      router.dismissAll();
      router.push("/(tabs)/orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      <View className="bg-green-100 p-6 rounded-full mb-6">
        <FontAwesome name="check" size={40} color="green" />
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Order Placed!
      </Text>
      <Text className="text-gray-500 text-center mb-10">
        Your order has been successfully placed and is being prepared.
      </Text>

      <TouchableOpacity
        onPress={() => {
          router.dismissAll();
          router.push("/(tabs)/orders");
        }}
        className="bg-orange-500 py-4 px-10 rounded-xl"
      >
        <Text className="text-white font-bold text-lg">Track Order</Text>
      </TouchableOpacity>
    </View>
  );
}
