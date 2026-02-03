import { Text, TouchableOpacity, View } from "react-native";

interface CategoryProps {
  name: string;
  emoji?: string;
}

export default function CategoryCard({ name, emoji }: CategoryProps) {
  return (
    <TouchableOpacity className="mr-6 w-[76px] items-center">
      <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Text className="text-2xl">{emoji ?? "🍔"}</Text>
      </View>
      <Text className="text-center font-medium text-gray-700" numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
