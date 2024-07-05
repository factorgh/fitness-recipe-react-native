import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/raleway";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";

import CalendarPicker from "react-native-calendar-picker";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

export default function MealPlanScreen() {
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontLoaded && !fontError) return null;

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 11) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleDateChange = (date: any) => {
    console.log(date);
  };
  const greeting = getGreeting();
  return (
    <View className="mt-[40px] ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full  mt-[30px] flex flex-row justify-between p-3 ">
          <Text style={{ fontFamily: "Nunito_700Bold" }} className="text-2xl">
            {greeting}
          </Text>
          <View className="flex flex-row gap-2 items-center">
            <Text>T</Text>

            <TouchableOpacity onPress={() => router.push("/(routes)/add-meal")}>
              <Entypo name="add-to-list" size={30} color="black" />
            </TouchableOpacity>
            <View>
              <Ionicons name="notifications-circle" size={35} color="#747474" />
            </View>
          </View>
        </View>
        {/* End of first section */}
        {/* Calendar section */}
        <View className=" mt-8 ">
          <CalendarPicker onDateChange={handleDateChange} />
        </View>
        {/* End of calendar section */}

        <View className="mt-5 mx-3">
          <Text className="text-2xl" style={{ fontFamily: "Nunito_700Bold" }}>
            Manage Plans
          </Text>
        </View>
        <ScrollView className="mt-3"></ScrollView>
      </ScrollView>
    </View>
  );
}
