import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

export default function MealPlanScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const response = await axios.get(`${SERVER_URL}/api/v1/recipe`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        Toast.show("Failed to fetch recipes.");
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <SafeAreaView>
      <LinearGradient className="h-screen" colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-[30px] mx-5 h-screen"
        >
          <View className="flex flex-row justify-between">
            <Text style={{ fontFamily: "Nunito_700Bold" }} className="text-3xl">
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
            <TextInput className="w-full p-3 " placeholder="search by name" />
          </View>
          <View className="h-[60px]    flex flex-row gap-2   items-center  ">
            <TouchableOpacity className="border border-slate-300 rounded-md p-2 flex flex-row items-center">
              <Text>Popularity</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-slate-300 rounded-md p-2 flex flex-row items-center ">
              <Text>Relevance</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-slate-300 rounded-md p-2 flex flex-row items-center ">
              <Text>Bookmarked</Text>
            </TouchableOpacity>
          </View>

          {recipes.length > 0 ? (
            <View className="mt-3 rounded-md mb-5">
              <FlatList
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RecipeItem item={item} />}
              />
            </View>
          ) : (
            <View className="flex-col items-center justify-center mt-52">
              <Text>No recipes available</Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
