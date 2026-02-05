import { Text, TouchableOpacity, View } from "react-native";

interface CategoryProps {
  name: string;
  emoji?: string;
  selected?: boolean;
}

export default function CategoryCard({ name, emoji, selected }: CategoryProps) {
  return (
    <TouchableOpacity className="mr-6 items-center">
      <View
        className={`mb-2 h-16 w-16 items-center justify-center rounded-full ${
          selected ? "bg-green-500" : "bg-gray-100"
        }`}
      >
        <Text className="text-2xl">{emoji ?? "🍔"}</Text>
      </View>
      <Text
        className={`text-center font-medium ${selected ? "text-green-600" : "text-gray-700"}`}
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
