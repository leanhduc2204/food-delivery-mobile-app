import { CategoryCardItem } from "@/components/browse/CategoryCard";
import { Text, TouchableOpacity, View } from "react-native";

interface CategoryProps {
  item: CategoryCardItem;
  selected?: boolean;
}

const CategoryCard = ({ item, selected }: CategoryProps) => {
  return (
    <TouchableOpacity className="mr-6 items-center">
      <View
        className={`mb-2 h-16 w-16 items-center justify-center rounded-full ${
          selected ? "bg-green-500" : "bg-gray-100"
        }`}
      >
        <Text className="text-2xl">{item.emoji ?? "🍔"}</Text>
      </View>
      <Text
        className={`text-center font-medium ${selected ? "text-green-600" : "text-gray-700"}`}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
