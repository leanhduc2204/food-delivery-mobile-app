import { Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="bg-white p-4 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity>
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Text className="ml-4 text-xl font-bold text-gray-800">
            Your Cart
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
