import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { AdvancedImage } from "cloudinary-react-native";
import { Recipe } from "@/types/Recipe";
import { cld } from "@/lib/cloudinary";

export default function RecipeItem({ item }: { item: Recipe }) {
  // Ensure item.thumbNail is a string (public ID)
  const thumbNailImage = cld.image(item.thumbNail);
  return (
    <TouchableOpacity
      onPress={() => router.push("/(routes)/meal-detail")}
      className="w-full h-[200px] border border-slate-300 shadow-sm rounded-md mt-5"
    >
      <AdvancedImage cldImg={thumbNailImage} />
      <Image
        source={require("@/assets/images/recipe.jpeg")}
        className="w-full h-[120px] rounded-t-md"
      />
      <View className="flex flex-row items-center justify-between p-3">
        <View>
          <Text className="text-md font-semibold">{item.name}</Text>
          <Text className="text-slate-500">Roastated Potato and Egg Plant</Text>
        </View>
        {/* Rating button */}
        <View className="w-[80px] h-[40px]  flex flex-row  items-center rounded-md bg-orange-300 justify-between p-3">
          <Text className="text-black">4.5</Text>
          <AntDesign name="star" size={10} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
