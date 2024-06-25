import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function MealDetailScreen() {
  const [isBookmarked, setIsBookMarked] = useState(false);
  return (
    <ScrollView>
      <View className="flex flex-col gap-3 w-full">
        <View className="w-full">
          <Image
            resizeMode="contain"
            source={require("@/assets/images/onboarding_1.png")}
            className="w-[100%] h-[230px] relative"
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/mealplans")}
          className="absolute p-3 top-8"
        >
          <AntDesign name="leftcircleo" size={30} color="white" />
        </TouchableOpacity>

        <View className="h-10 ">
          <View>
            <Text className="text-white">Vegetable Salads with potato</Text>
            {isBookmarked ? (
              <TouchableOpacity onPress={() => setIsBookMarked(!isBookmarked)}>
                <FontAwesome name="bookmark" size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsBookMarked(!isBookmarked)}>
                <FontAwesome name="bookmark-o" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
