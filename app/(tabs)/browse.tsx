import { Text, TextInput, View } from "react-native";

export default function BrowseScreen() {
  return (
    <View className="flex-1 bg-white pt-10 px-4">
      <Text className="text-3xl font-bold mb-4">Browse</Text>
      <View className="bg-gray-100 p-3 rounded-lg flex-row items-center">
        <TextInput
          placeholder="Search for food..."
          className="flex-1 text-base"
        />
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold mb-2">Categories</Text>
        <View className="flex-row flex-wrap gap-2">
          {["Pizza", "Burger", "Sushi", "Vegan"].map((cat) => (
            <View key={cat} className="bg-orange-100 px-4 py-2 rounded-full">
              <Text className="text-orange-600 font-medium">{cat}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
