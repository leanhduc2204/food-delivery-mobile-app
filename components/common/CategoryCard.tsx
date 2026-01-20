import { ImageSourcePropType, Text, TouchableOpacity } from "react-native";

interface CategoryProps {
  name: string;
  image: ImageSourcePropType;
  isSelected?: boolean;
}

// Fallback image using a colored view if no image provided, but we'll try to use images.
// For now, just a simple pill design.
export default function CategoryCard({
  name,
  image,
  isSelected,
}: CategoryProps) {
  return (
    <TouchableOpacity
      className={`mr-4 items-center justify-center rounded-full px-4 py-2 ${isSelected ? "bg-orange-500" : "bg-gray-100"}`}
    >
      <Text
        className={`${isSelected ? "text-white font-bold" : "text-gray-800 font-medium"}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
