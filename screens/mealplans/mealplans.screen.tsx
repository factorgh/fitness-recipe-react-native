import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/raleway";
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

export default function MealPlanScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Set loading to true
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

  console.log("<------recipe deatils-------->", recipes);
  return (
    <SafeAreaView>
      <LinearGradient className="h-screen" colors={["#E5ECF9", "#F6F7F9"]}>
        <View className="flex-1">
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={recipes}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <>
                <View className="mt-[30px] mx-5">
                  <View className="flex flex-row justify-between">
                    <Text
                      style={{ fontFamily: "Nunito_700Bold" }}
                      className="text-3xl"
                    >
                      Recipes
                    </Text>
                    <Ionicons
                      onPress={() => router.push("/(routes)/create-recipe")}
                      name="add"
                      size={30}
                      color="black"
                    />
                  </View>
                  <View className="border border-slate-300 rounded-full flex flex-row items-center mt-3 px-2">
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput
                      className="w-full p-3 "
                      placeholder="search by name"
                    />
                  </View>
                  <View className="h-[60px] flex flex-row gap-2 items-center mt-3">
                    <TouchableOpacity className="border bg-red-400 border-slate-300 rounded-md p-2 flex flex-row items-center">
                      <Text className="text-white">All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-slate-300 rounded-md p-2 flex flex-row items-center">
                      <Text>Bookmarked</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {loading && <Loader />}
                {!loading && recipes.length === 0 && (
                  <View className="flex-col items-center justify-center mt-52">
                    <Text>No recipes available</Text>
                  </View>
                )}
              </>
            }
            renderItem={({ item }) => <RecipeItem item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }} // Add bottom padding here
            ListFooterComponent={<View style={{ height: 60 }} />} // Add extra space at the bottom
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
