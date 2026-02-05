import { ShoppingCart } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface DishCardProps {
  item: any;
}

const DishCard = ({ item }: DishCardProps) => {
  return (
    <TouchableOpacity className="mb-4 mr-4 w-[190px] rounded-2xl bg-white shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="h-32 w-full rounded-t-2xl"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-bold text-gray-800">{item.name}</Text>
        <Text className="mt-1 text-sm text-gray-500">{item.restaurant}</Text>
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="font-bold text-green-600">{item.price}</Text>
          <TouchableOpacity className="rounded-full bg-green-500 p-2">
            <ShoppingCart color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DishCard;
