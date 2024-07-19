import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import CalendarPicker from "react-native-calendar-picker";
import { Entypo } from "@expo/vector-icons";

import { router } from "expo-router";

import Allmeals from "@/components/allmeals/allmeals";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AllmealsTrainee from "@/components/allmeals/allmeals-trainee";

export default function MealPlanScreen() {
  const [date, setDate] = useState("");
  // let [fontLoaded, fontError] = useFonts({
  //   Nunito_400Regular,
  //   Nunito_700Bold,
  // });

  // if (!fontLoaded && !fontError) return null;

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

  const handleDateChange = (dateSelected: any) => {
    console.log(dateSelected);
    setDate(dateSelected);
  };
  const greeting = getGreeting();
  return (
    <SafeAreaView>
      <LinearGradient className="h-full" colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full  mt-[15px] flex flex-row justify-between p-3 ">
            <Text style={{ fontFamily: "Nunito_700Bold" }} className="text-2xl">
              {greeting}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <View className="rounded-full w-8 h-8 bg-slate-300"></View>
              <View>
                <Ionicons
                  name="notifications-circle"
                  size={35}
                  color="#747474"
                />
              </View>
            </View>
          </View>

          {/* End of first section */}
          {/* Calendar section */}
          <View className=" mt-3 ">
            <CalendarPicker onDateChange={handleDateChange} />
          </View>
          {/* End of calendar section */}

          <View className="mt-5 mx-3">
            <Text className="text-2xl" style={{ fontFamily: "Nunito_700Bold" }}>
              Upcoming meal plans
            </Text>
          </View>
          <View>
            <AllmealsTrainee date={date} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
