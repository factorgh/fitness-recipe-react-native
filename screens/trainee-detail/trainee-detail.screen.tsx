import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { FAB } from "@rneui/base";
import MealPlanItem from "@/components/mealPlanItem";
import { LinearGradient } from "expo-linear-gradient";

export default function TraineeDetailScreen() {
  const [activeTab, setActiveTab] = useState("button1");

  const active = `border border-red-500  bg-red-500 flex w-full h-1 mt-3`;
  const inactive = `border border-red-200  bg-red-500 flex w-[100%] mt-3`;

  const handlePress = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <SafeAreaView>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView>
          <View className="mt-8">
            {/* First section  */}
            <View className="flex flex-row items-center justify-between mx-5 mb-5">
              <View className="flex flex-row items-center gap-5">
                <AntDesign
                  onPress={() => router.back()}
                  name="left"
                  size={24}
                  color="black"
                />
                <Image
                  style={{ height: 50, width: 50, borderRadius: 30 }}
                  source={require("@/assets/images/profile.webp")}
                />
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-slate-500 "
                >
                  Smith
                </Text>
              </View>
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </View>
            {/* Filter part */}
            <View className="flex flex-row w-[100%] ">
              <TouchableOpacity
                className="w-[50%]  flex flex-col items-center justify-center"
                onPress={() => handlePress("button1")}
              >
                <Text>Pending</Text>
                <View
                  className={activeTab === "button1" ? active : inactive}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[50%] flex flex-col items-center justify-center"
                onPress={() => handlePress("button2")}
              >
                <Text>Completed</Text>
                <View
                  className={activeTab === "button2" ? active : inactive}
                ></View>
              </TouchableOpacity>
            </View>
            {/* fILTER DETAILS */}
            <View className="mt-3">
              <ScrollView>
                {activeTab === "button1" ? (
                  <>
                    <View>
                      <MealPlanItem />
                      <MealPlanItem />
                      <MealPlanItem />
                    </View>
                  </>
                ) : (
                  <>
                    <MealPlanItem />
                  </>
                )}
              </ScrollView>

              <FAB
                size="large"
                onPress={() => router.push("/(routes)/assign-meal")}
                placement="right"
                title="+"
                color="red"
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
