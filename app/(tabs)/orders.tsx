import { useOrderStore } from "@/store/orderStore";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const { orders } = useOrderStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No orders yet</Text>
          <Link href="/(tabs)" className="mt-4">
            <Text className="text-orange-500 font-bold">Start Ordering</Text>
          </Link>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-2xl border border-gray-100 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-900 font-bold text-lg">
                  Order #{item.id}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
              <Text className="text-gray-500 mb-2">
                {item.items.length} items • ${item.total.toFixed(2)}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 font-bold text-xs">
                    {item.status}
                  </Text>
                </View>
                <Text className="text-orange-500 font-bold">View Details</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
