import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/raleway";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@gorhom/bottom-sheet";

import CalendarPicker from "react-native-calendar-picker";

import TraineePlanItem from "@/components/traineePlan";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealPlanScreen() {
  const [showPopup, setShowPopup] = useState(false);
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
    <SafeAreaView>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
        <View className="mt-[40px] ">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-full  mt-[30px] flex flex-row justify-between p-3 ">
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-2xl"
              >
                {greeting}
              </Text>

              <View className="flex flex-row gap-2 items-center">
                <Image
                  style={{
                    width: 27,
                    height: 27,
                    borderRadius: 20,
                    padding: 2,
                  }}
                  source={require("@/assets/images/profile.webp")}
                />

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
            <View className=" mt-8 ">
              <CalendarPicker onDateChange={handleDateChange} />
            </View>
            {/* End of calendar section */}

            <View className="mt-5 mx-3">
              <Text
                style={{
                  fontFamily: "Nunito_700Bold",
                  marginLeft: 20,
                  fontSize: 20,
                }}
              >
                Upcoming meal plans
              </Text>
            </View>

            <ScrollView className="mt-1 mx-3 mb-5">
              <TraineePlanItem />
              <TraineePlanItem />
            </ScrollView>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
