import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";

import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { cld } from "@/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { truncateText } from "@/utils/fomatters";

export default function TraineePlanItem({ item }: { item: any }) {
  // Date and time formatting
  function formatTime(isoString: any) {
    const date = new Date(isoString);
    return format(date, "hh:mm:ss a"); // 'hh:mm:ss a' formats to 12-hour time with AM/PM
  }

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    return format(date, "MM/dd/yy"); // 'MM/dd/yy' formats to '12/07/24'
  }

  console.log(item);
  const thumbNailImage = cld.image(item.recipe.thumbNail);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(routes)/trainee-plan-detail",
          params: { item: JSON.stringify(item.recipe) },
        })
      }
      className=" flex-1 flex-row w-[400px]  p-2 gap-5 border border-slate-300 shadow-sm rounded-md  mt-5"
    >
      {/* Image section */}

      <AdvancedImage
        style={{ width: 90, height: 100, borderRadius: 12 }}
        cldImg={thumbNailImage}
      />

      {/* Description section with time and date attached  */}
      <View className="flex flex-col  justify-between">
        {/* Description  */}
        <View className="mt-2">
          <Text style={{ fontFamily: "Nunito_700Bold", marginBottom: 5 }}>
            {item.recipe.name}
          </Text>
          <Text
            className="text-slate-500 text-sm"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            {truncateText(item.recipe.description, 20)}
          </Text>
        </View>
        {/* Time and date */}
        <View className="flex flex-row justify-between items-center mb-2">
          <View className="flex flex-row gap-2 mr-3 items-center">
            <Entypo name="back-in-time" size={15} color="black" />
            <Text>{formatTime(item.time_picked)}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <FontAwesome name="calendar-times-o" size={15} color="black" />
            <Text>{formatDate(item.date_picked)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
