import { useOrderStore } from "@/store/orderStore";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const { orders } = useOrderStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-gray-100 bg-white p-4">
        <Text className="text-2xl font-bold text-gray-900">My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">No orders yet</Text>
          <Link href="/(tabs)" className="mt-4">
            <Text className="font-bold text-orange-500">Start Ordering</Text>
          </Link>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-lg font-bold text-gray-900">
                  Order #{item.id}
                </Text>
                <Text className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
              <Text className="mb-2 text-gray-500">
                {item.items.length} items • ${item.total.toFixed(2)}
              </Text>
              <View className="mt-2 flex-row items-center justify-between">
                <View className="rounded-full bg-green-100 px-3 py-1">
                  <Text className="text-xs font-bold text-green-700">
                    {item.status}
                  </Text>
                </View>
                <Text className="font-bold text-orange-500">View Details</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
