import { router } from "expo-router";
import {
  ArrowLeft,
  Award,
  ChevronDown,
  Clock,
  Filter,
  MapPin,
  Search,
  Star,
  TrendingUp,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BrowseScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Mock categories
  const categories = [
    { id: "1", name: "All", icon: "🍽️" },
    { id: "2", name: "Restaurants", icon: "🍴" },
    { id: "3", name: "Fast Food", icon: "🍔" },
    { id: "4", name: "Fine Dining", icon: "🍷" },
    { id: "5", name: "Cafes", icon: "☕" },
    { id: "6", name: "Desserts", icon: "🍰" },
  ];

  // Mock cuisine types
  const cuisineTypes = [
    "All",
    "Italian",
    "American",
    "Japanese",
    "Mexican",
    "Chinese",
    "Indian",
    "Thai",
    "Mediterranean",
  ];

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

  // Mock restaurants data
  const restaurants = [
    {
      id: "1",
      name: "Bella Vista Italian Bistro",
      image:
        "https://images.unsplash.com/photo-1712026063351-61d52c2e4abb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FzdWFsJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.7,
      reviews: 1248,
      deliveryTime: "25-35 min",
      deliveryFee: "$2.99",
      cuisine: "Italian",
      priceRange: "$$",
      distance: "1.2 km",
      category: "Fine Dining",
      featured: true,
      promoted: false,
    },
    {
      id: "2",
      name: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1648580852350-3098af89f110?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVsaWNpb3VzJTIwZm9vZCUyMG1lYWx8ZW58MHx8MHx8fDA%3D",
      rating: 4.5,
      reviews: 892,
      deliveryTime: "20-30 min",
      deliveryFee: "$1.99",
      cuisine: "American",
      priceRange: "$",
      distance: "0.8 km",
      category: "Fast Food",
      featured: false,
      promoted: true,
    },
    {
      id: "3",
      name: "Sushi Heaven",
      image:
        "https://images.unsplash.com/photo-1718808094109-4d24bd3ac5de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TW9kZXJuJTIwdXJiYW4lMjByZXN0YXVyYW50fGVufDB8fDB8fHww",
      rating: 4.9,
      reviews: 1567,
      deliveryTime: "30-40 min",
      deliveryFee: "$3.99",
      cuisine: "Japanese",
      priceRange: "$$$",
      distance: "1.5 km",
      category: "Fine Dining",
      featured: true,
      promoted: false,
    },
    {
      id: "4",
      name: "Taco Fiesta",
      image:
        "https://images.unsplash.com/photo-1726533765356-2608b035ff6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T3V0ZG9vciUyMHBhdGlvJTIwZGluaW5nfGVufDB8fDB8fHww",
      rating: 4.6,
      reviews: 723,
      deliveryTime: "15-25 min",
      deliveryFee: "$1.99",
      cuisine: "Mexican",
      priceRange: "$",
      distance: "0.6 km",
      category: "Fast Food",
      featured: false,
      promoted: false,
    },
    {
      id: "5",
      name: "Golden Dragon Chinese",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hpbmVzZSUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
      rating: 4.4,
      reviews: 634,
      deliveryTime: "25-35 min",
      deliveryFee: "$2.49",
      cuisine: "Chinese",
      priceRange: "$$",
      distance: "1.8 km",
      category: "Restaurants",
      featured: false,
      promoted: false,
    },
    {
      id: "6",
      name: "Spice Garden Indian",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.8,
      reviews: 987,
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      cuisine: "Indian",
      priceRange: "$$",
      distance: "2.1 km",
      category: "Fine Dining",
      featured: true,
      promoted: false,
    },
    {
      id: "7",
      name: "Cafe Milano",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2FmZSUyMGludGVyaW9yfGVufDB8fDB8fHww",
      rating: 4.3,
      reviews: 456,
      deliveryTime: "15-20 min",
      deliveryFee: "$1.49",
      cuisine: "Italian",
      priceRange: "$$",
      distance: "0.5 km",
      category: "Cafes",
      featured: false,
      promoted: true,
    },
    {
      id: "8",
      name: "Sweet Delights Bakery",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFrZXJ5JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
      rating: 4.7,
      reviews: 789,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.49",
      cuisine: "Desserts",
      priceRange: "$$",
      distance: "1.0 km",
      category: "Desserts",
      featured: false,
      promoted: false,
    },
  ];

  // Filter restaurants based on selected filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || restaurant.category === selectedCategory;
    const matchesCuisine =
      selectedCuisine === "All" || restaurant.cuisine === selectedCuisine;
    const matchesPrice =
      selectedPriceRange === "All" ||
      restaurant.priceRange === selectedPriceRange;
    const matchesRating =
      selectedRating === "All" ||
      (selectedRating === "4.5" && restaurant.rating >= 4.5) ||
      (selectedRating === "4.0" && restaurant.rating >= 4.0) ||
      (selectedRating === "3.5" && restaurant.rating >= 3.5);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCuisine &&
      matchesPrice &&
      matchesRating
    );
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.reviews - a.reviews;
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      case "delivery":
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      default:
        return 0;
    }
  });

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className={`mr-4 items-center ${selectedCategory === item.name ? "opacity-100" : "opacity-60"}`}
      onPress={() => setSelectedCategory(item.name)}
    >
      <View
        className={`h-14 w-14 items-center justify-center rounded-full ${selectedCategory === item.name ? "bg-green-500" : "bg-gray-100"}`}
      >
        <Text className="text-2xl">{item.icon}</Text>
      </View>
      <Text
        className={`mt-2 text-xs ${selectedCategory === item.name ? "font-medium text-green-600" : "text-gray-600"}`}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFilterChip = ({
    item,
    selected,
    onPress,
  }: {
    item: any;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`mr-2 rounded-full px-3 py-1.5 ${selected ? "bg-green-500" : "bg-gray-100"}`}
    >
      <Text className={`text-sm ${selected ? "text-white" : "text-gray-700"}`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderRestaurantCard = ({ item }: { item: any }) => (
    <TouchableOpacity className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="h-40 w-full"
          resizeMode="cover"
        />
        {item.featured && (
          <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-amber-500 px-2 py-1">
            <Award color="white" size={14} />
            <Text className="ml-1 text-xs font-medium text-white">
              Featured
            </Text>
          </View>
        )}
        {item.promoted && (
          <View className="absolute right-3 top-3 flex-row items-center rounded-full bg-green-500 px-2 py-1">
            <TrendingUp color="white" size={14} />
            <Text className="ml-1 text-xs font-medium text-white">
              Promoted
            </Text>
          </View>
        )}
      </View>

      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
            <Text className="mt-1 text-sm text-gray-500">
              {item.cuisine} • {item.priceRange}
            </Text>
          </View>
          <View className="flex-row items-center rounded-full bg-green-50 px-2 py-1">
            <Star color="#FFC107" fill="#FFC107" size={14} />
            <Text className="ml-1 text-sm font-medium text-green-800">
              {item.rating}
            </Text>
            <Text className="ml-1 text-xs text-green-600">
              ({item.reviews})
            </Text>
          </View>
        </View>

        <View className="mt-3 flex-row items-center space-x-4">
          <View className="flex-row items-center">
            <Clock color="#8BC34A" size={16} />
            <Text className="ml-1 text-sm text-gray-600">
              {item.deliveryTime}
            </Text>
          </View>
          <View className="flex-row items-center">
            <MapPin color="#8BC34A" size={16} />
            <Text className="ml-1 text-sm text-gray-600">{item.distance}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-600">
              Delivery: {item.deliveryFee}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedCuisine("All");
    setSelectedPriceRange("All");
    setSelectedRating("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedCuisine !== "All" ||
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
            renderItem={renderCategoryItem}
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

            {/* Cuisine Filter */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-600">
                Cuisine
              </Text>
              <View className="flex-row flex-wrap">
                {cuisineTypes.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    onPress={() => setSelectedCuisine(cuisine)}
                    className={`mb-2 mr-2 rounded-full px-3 py-1.5 ${selectedCuisine === cuisine ? "bg-green-500" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm ${selectedCuisine === cuisine ? "text-white" : "text-gray-700"}`}
                    >
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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

        {/* Sort & Results */}
        <View className="mb-2 mt-4 flex-row items-center justify-between px-4">
          <Text className="text-gray-600">
            {sortedRestaurants.length}{" "}
            {sortedRestaurants.length === 1 ? "restaurant" : "restaurants"}{" "}
            found
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="mr-1 text-sm text-gray-600">Sort by:</Text>
            <Text className="mr-1 text-sm font-medium text-green-600">
              {sortBy === "popular"
                ? "Popular"
                : sortBy === "rating"
                  ? "Rating"
                  : sortBy === "distance"
                    ? "Distance"
                    : "Delivery Time"}
            </Text>
            <ChevronDown color="#4CAF50" size={16} />
          </TouchableOpacity>
        </View>

        {/* Restaurant List */}
        <View className="px-4 pb-4">
          {sortedRestaurants.length > 0 ? (
            sortedRestaurants.map((restaurant) => (
              <View key={restaurant.id}>
                {renderRestaurantCard({ item: restaurant })}
              </View>
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
