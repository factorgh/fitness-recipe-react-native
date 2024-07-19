import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
export default function TraineePlanItem({ item }: { item: any }) {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(routes)/trainee-plan-detail")}
      className=" flex-1 flex-row w-[400px]  p-2 gap-5 border border-slate-300 shadow-sm rounded-md  mt-5"
    >
      {/* Image section */}
      <Image
        style={{ width: 90, height: 100, borderRadius: 12 }}
        source={require("@/assets/images/recipe.jpeg")}
      />

      {/* Description section with time and date attached  */}
      <View className="flex flex-col  justify-between">
        {/* Description  */}
        <View className="mt-2">
          <Text style={{ fontFamily: "Nunito_700Bold", marginBottom: 5 }}>
            Vegetable Salads with potato{" "}
          </Text>
          <Text
            className="text-slate-500 text-sm"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            Roasted potato and Eggplant
          </Text>
        </View>
        {/* Time and date */}
        <View className="flex flex-row justify-between items-center mb-2">
          <View className="flex flex-row gap-2 items-center">
            <Entypo name="back-in-time" size={15} color="black" />
            <Text>10:30 AM</Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <FontAwesome name="calendar-times-o" size={15} color="black" />
            <Text>12/07/24</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
