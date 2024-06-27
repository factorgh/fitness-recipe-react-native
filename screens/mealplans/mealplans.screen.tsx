import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/raleway";
import RecipeItem from "@/components/RecipeItem";
import { AntDesign } from "@expo/vector-icons";

export default function MealPlanScreen() {
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontLoaded && !fontError) return null;

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145572",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29",
      title: "Third Item",
    },
  ];
  return (
    <View className="mt-[70px] mx-5 ">
      <Text style={{ fontFamily: "Nunito_700Bold" }} className="text-3xl">
        Recipes
      </Text>
      <View className="border border-slate-300 rounded-full flex flex-row items-center mt-3 px-2">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput className="w-full p-3 " placeholder="search by name" />
      </View>
      <View className="h-[60px]    flex flex-row gap-2   items-center  ">
        <TouchableOpacity className="border border-slate-300 rounded-full p-2 flex flex-row items-center">
          <Text>Popularity</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-slate-300 rounded-full p-2 flex flex-row items-center ">
          <Text>Relevance</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-slate-300 rounded-full p-2 flex flex-row items-center ">
          <Text>Bookmarked</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-1">
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecipeItem item={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
