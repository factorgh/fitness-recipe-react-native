import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@/utils/utils";
import { Recipe } from "@/types/Recipe";
import RecipeItem from "@/components/RecipeItem";
import { router } from "expo-router";

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
            Authorization: token || "",
          },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.gradient}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Recipes</Text>
            <Ionicons
              onPress={() => router.push("/(routes)/create-recipe")}
              name="add"
              size={30}
              color="black"
            />
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name"
            />
          </View>
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text>Popularity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text>Relevance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text>Bookmarked</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recipesContainer}>
            <FlatList
              nestedScrollEnabled
              data={recipes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <RecipeItem item={item} />}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  recipesContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
