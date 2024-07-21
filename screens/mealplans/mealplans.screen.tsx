import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import RecipeItem from "@/components/RecipeItem";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "@/types/Recipe";
import { Toast } from "react-native-toast-notifications";
import Loader from "@/components/loader";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadingTransition,
} from "react-native-reanimated";
import { AdvancedImage } from "cloudinary-react-native";
import useUser from "@/hooks/useUser";
import { cld } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export default function MealPlanScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useUser();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchRecipes = async () => {
      const token = await AsyncStorage.getItem("access_token");
      console.log("<------token at recipe------>", token);
      await axios
        .get(`${SERVER_URL}/api/v1/recipe/owner`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.receipe);

          setRecipes(res.data.receipe);
        })
        .catch((err) => {
          setLoading(false);
          Toast.show("No recipes created.");
          setError("Failed to fetch recipes.");
        })
        .finally(() => setLoading(false));
    };

    fetchRecipes();
  }, [refreshing]);

  let remoteCldImage;
  if (user?.img_url) {
    remoteCldImage = cld
      .image(user.img_url)
      .resize(thumbnail().width(100).height(100));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={["#E5ECF9", "#F6F7F9"]}>
        <View style={{ flex: 1, margin: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
              marginTop: 15,
            }}
          >
            <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 30 }}>
              Recipes
            </Text>
            <View className="flex-row gap-2">
              <Ionicons
                onPress={() => router.push("/(routes)/create-recipe")}
                name="add"
                size={30}
                color="black"
              />
              <Animated.View
                entering={FadeInLeft.duration(200).springify()}
                style={{
                  width: 80,

                  height: 30,
                  display: "flex",
                  borderRadius: 15,
                  backgroundColor: "red",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  gap: 5,
                }}
              >
                {user?.img_url ? (
                  <AdvancedImage
                    className="w-5 h-5 rounded-full"
                    cldImg={remoteCldImage!}
                  />
                ) : (
                  <View style={styles.notificationCircle} />
                )}

                <Text style={{ fontSize: 10, color: "white" }}>
                  {user?.role === 0 ? "Trainee" : "Trainer"}
                </Text>
              </Animated.View>
            </View>
          </View>
          <View
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <AntDesign name="search1" size={24} color="black" />
            <TextInput
              style={{ flex: 1, padding: 10 }}
              placeholder="search by name"
            />
          </View>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <TouchableOpacity
              style={{ backgroundColor: "red", borderRadius: 8, padding: 10 }}
            >
              <Text style={{ color: "white" }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
              }}
            >
              <Text>Bookmarked</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loader />
          ) : recipes.length > 0 ? (
            <Animated.View
              entering={FadeInDown.duration(100).springify()}
              className="mt-3 mb-28"
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RecipeItem item={item} />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </Animated.View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No recipes available</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notificationCircle: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: "#D1D5DB",
  },
});
