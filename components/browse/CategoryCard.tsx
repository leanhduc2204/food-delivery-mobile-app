import { GlobalCategory } from "@/hooks/useGlobalCategories";
import { Text, TouchableOpacity, View } from "react-native";

export type CategoryCardItem = Pick<GlobalCategory, "id" | "name" | "emoji">;

interface CategoryCardProps {
  item: CategoryCardItem;
  selectedCategory?: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryCard = ({
  item,
  selectedCategory,
  setSelectedCategory,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity
      className={`mr-4 items-center ${selectedCategory === item.id ? "opacity-100" : "opacity-60"}`}
      onPress={() => setSelectedCategory(item.id)}
    >
      <View
        className={`h-14 w-14 items-center justify-center rounded-full ${selectedCategory === item.id ? "bg-green-500" : "bg-gray-100"}`}
      >
        <Text className="text-2xl">{item.emoji}</Text>
      </View>
      <Text
        className={`mt-2 text-xs ${selectedCategory === item.name ? "font-medium text-green-600" : "text-gray-600"}`}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
