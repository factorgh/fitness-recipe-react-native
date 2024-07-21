import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { AdvancedImage } from "cloudinary-react-native";
import { Recipe } from "@/types/Recipe";
import { cld } from "@/lib/cloudinary";
import { truncateText } from "@/utils/fomatters";

export default function RecipeItem({ item }: { item: Recipe }) {
  // Ensure item.thumbNail is a string (public ID)
  const thumbNailImage = cld.image(item.thumbNail);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(routes)/meal-detail",
          params: { item: JSON.stringify(item) },
        })
      }
      className="w-full h-[180px] border border-slate-300 shadow-sm rounded-md mt-5"
    >
      <AdvancedImage
        className="w-full h-[100px] rounded-t-md "
        cldImg={thumbNailImage}
      />

      <View className="flex flex-row items-center justify-between p-3">
        <View className="w-52">
          <Text className="text-md font-semibold">{item.name}</Text>
          <Text className="text-slate-500 text-[12px]">
            {truncateText(item.description, 20)}
          </Text>
        </View>
        {/* Rating button */}
        <View className="w-[80px] h-[40px]  flex flex-row  items-center rounded-full bg-orange-300 justify-center p-3">
          <Text className="text-white mr-3 ">4.5</Text>
          <AntDesign name="star" size={12} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
