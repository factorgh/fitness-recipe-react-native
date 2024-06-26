import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/raleway";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import CalendarPicker from "react-native-calendar-picker";
import { Entypo } from "@expo/vector-icons";
import MealPlanItem from "@/components/mealPlanItem";
import { router } from "expo-router";
import { SERVER_URL } from "@/utils/utils";
import Allmeals from "@/components/allmeals/allmeals";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const [date, setDate] = useState("");
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

  const handleDateChange = (dateSelected: any) => {
    console.log(dateSelected);
    setDate(dateSelected);
  };
  const greeting = getGreeting();
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <View className="mt-[40px] ">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full  mt-[30px] flex flex-row justify-between p-3 ">
            <Text style={{ fontFamily: "Nunito_700Bold" }} className="text-2xl">
              {greeting}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <TouchableOpacity
                onPress={() => router.push("/(routes)/add-meal")}
              >
                <Entypo name="add-to-list" size={30} color="black" />
              </TouchableOpacity>
              <View>
                <Ionicons
                  name="notifications-circle"
                  size={35}
                  color="#747474"
                />
              </View>
              <Avatar
                size={32}
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
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
          <View>
            <Allmeals date={date} />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
