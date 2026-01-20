import { useAuthStore } from "@/store/authStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, isAuthenticated, login, register, logout, isLoading } =
    useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleAuth = async () => {
    if (isLogin) {
      await login(email);
    } else {
      await register(name, email);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-white p-5 justify-center">
        <View className="items-center mb-10">
          <View className="bg-orange-100 p-4 rounded-full mb-4">
            <FontAwesome name="user" size={40} color="#f97316" />
          </View>
          <Text className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </Text>
          <Text className="text-gray-500 mt-2 text-center">
            {isLogin
              ? "Sign in to continue ordering"
              : "Join us to order your favorite food"}
          </Text>
        </View>

        <View className="w-full">
          {!isLogin && (
            <View className="bg-gray-100 p-4 rounded-xl mb-4">
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                className="text-base text-gray-900"
              />
            </View>
          )}

          <View className="bg-gray-100 p-4 rounded-xl mb-4">
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              className="text-base text-gray-900"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {isLogin && (
            <View className="bg-gray-100 p-4 rounded-xl mb-6">
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="text-base text-gray-900"
              />
            </View>
          )}

          <TouchableOpacity
            onPress={handleAuth}
            className="bg-orange-500 py-4 rounded-xl items-center shadow-lg mb-6"
          >
            <Text className="text-white font-bold text-lg">
              {isLogin ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
            className="items-center"
          >
            <Text className="text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text className="text-orange-500 font-bold">
                {isLogin ? "Sign Up" : "Sign In"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-5 items-center border-b border-gray-100">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mt-4">
            {user?.name}
          </Text>
          <Text className="text-gray-500">{user?.email}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-6 border-b border-gray-100">
          <View className="items-center">
            <Text className="text-xl font-bold text-gray-900">12</Text>
            <Text className="text-gray-500 text-sm">Orders</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-gray-900">4</Text>
            <Text className="text-gray-500 text-sm">favorites</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-gray-900">$142</Text>
            <Text className="text-gray-500 text-sm">Saved</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="p-5">
          <Text className="text-lg font-bold text-gray-900 mb-4">Account</Text>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/orders")}
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="bg-orange-100 p-2 rounded-lg mr-4">
                <FontAwesome name="list-alt" size={20} color="#f97316" />
              </View>
              <Text className="text-base font-bold text-gray-700">
                My Orders
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="bg-orange-100 p-2 rounded-lg mr-4">
                <FontAwesome name="credit-card" size={20} color="#f97316" />
              </View>
              <Text className="text-base font-bold text-gray-700">
                Payment Methods
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="bg-orange-100 p-2 rounded-lg mr-4">
                <FontAwesome name="map-marker" size={20} color="#f97316" />
              </View>
              <Text className="text-base font-bold text-gray-700">
                Addresses
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            className="flex-row items-center justify-between py-4 mt-4"
          >
            <View className="flex-row items-center">
              <View className="bg-red-100 p-2 rounded-lg mr-4">
                <FontAwesome name="sign-out" size={20} color="red" />
              </View>
              <Text className="text-base font-bold text-red-500">Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
