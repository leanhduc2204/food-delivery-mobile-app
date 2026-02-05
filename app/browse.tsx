import CategoryCard from "@/components/browse/CategoryCard";
import RestaurantCard from "@/components/browse/RestaurantCard";
import { useGlobalCategories } from "@/hooks/useGlobalCategories";
import { useRestaurants } from "@/hooks/useRestaurants";
import { router } from "expo-router";
import { ArrowLeft, Filter, Search, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CATEGORY_ALL = "all";

const BrowseScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);

  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: restaurants,
    isLoading,
    error,
  } = useRestaurants({
    search: searchQuery,
    globalCategory: selectedCategory,
  });
  const {
    data: globalCategories,
    isLoading: globalCategoriesLoading,
    error: globalCategoriesError,
  } = useGlobalCategories();

  const categories = useMemo(() => {
    return [
      { id: "all", name: "All", emoji: "🍽️" },
      ...(globalCategories?.map((category) => ({
        id: category.id,
        name: category.name,
        emoji: category.emoji,
      })) || []),
    ];
  }, [globalCategories]);

  // Mock price ranges
  const priceRanges = [
    { id: "1", label: "All", range: "All" },
    { id: "2", label: "$", range: "Budget" },
    { id: "3", label: "$$", range: "Moderate" },
    { id: "4", label: "$$$", range: "Expensive" },
  ];

  // Mock rating filters
  const ratingFilters = [
    { id: "1", label: "All", rating: "All" },
    { id: "2", label: "4.5+", rating: "4.5" },
    { id: "3", label: "4.0+", rating: "4.0" },
    { id: "4", label: "3.5+", rating: "3.5" },
  ];

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("All");
    setSelectedRating("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedPriceRange !== "All" ||
    selectedRating !== "All" ||
    searchQuery !== "";

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="border-b border-gray-100 bg-white px-4 pb-4 pt-2">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="#000" size={20} />
          </TouchableOpacity>
          <View className="ml-3 flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-2.5">
            <Search color="#888" size={20} />
            <TextInput
              className="ml-3 flex-1 text-gray-700"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <X color="#888" size={18} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className="ml-3 rounded-full bg-green-500 p-2.5"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Categories */}
        <View className="mt-4 px-4">
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard
                item={item}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Filters Section */}
        {showFilters && (
          <View className="mx-4 mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-bold text-gray-800">Filters</Text>
              {hasActiveFilters && (
                <TouchableOpacity onPress={clearAllFilters}>
                  <Text className="text-sm font-medium text-green-600">
                    Clear All
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Price Range Filter */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-600">
                Price Range
              </Text>
              <View className="flex-row">
                {priceRanges.map((price) => (
                  <TouchableOpacity
                    key={price.id}
                    onPress={() => setSelectedPriceRange(price.range)}
                    className={`mr-2 rounded-full px-4 py-2 ${selectedPriceRange === price.range ? "bg-green-500" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedPriceRange === price.range ? "text-white" : "text-gray-700"}`}
                    >
                      {price.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating Filter */}
            <View className="mb-2">
              <Text className="mb-2 text-sm font-medium text-gray-600">
                Rating
              </Text>
              <View className="flex-row">
                {ratingFilters.map((rating) => (
                  <TouchableOpacity
                    key={rating.id}
                    onPress={() => setSelectedRating(rating.rating)}
                    className={`mr-2 rounded-full px-4 py-2 ${selectedRating === rating.rating ? "bg-green-500" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedRating === rating.rating ? "text-white" : "text-gray-700"}`}
                    >
                      {rating.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Restaurant List */}
        <View className="mt-4 px-4 pb-4">
          {restaurants?.length && restaurants?.length > 0 ? (
            restaurants?.map((restaurant) => (
              <RestaurantCard key={restaurant.id} item={restaurant} />
            ))
          ) : (
            <View className="items-center justify-center py-16">
              <Search color="#9CA3AF" size={48} />
              <Text className="mt-4 text-lg text-gray-500">
                No restaurants found
              </Text>
              <Text className="mt-2 text-sm text-gray-400">
                Try adjusting your filters
              </Text>
              <TouchableOpacity
                onPress={clearAllFilters}
                className="mt-4 rounded-full bg-green-500 px-6 py-2"
              >
                <Text className="font-medium text-white">Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BrowseScreen;
