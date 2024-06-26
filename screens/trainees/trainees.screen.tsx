import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Trainee from "@/components/trainee";
import { FAB } from "@rneui/themed";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function TraineesScreen() {
  const [activeTab, setActiveTab] = useState("button1");

  const active = `border border-red-500  bg-red-500 flex w-full h-1 mt-3`;
  const inactive = `border border-red-200  bg-red-500 flex w-[100%] mt-3`;

  const handlePress = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <View className="mt-[60px]">
        <Text
          style={{ fontFamily: "Nunito_700Bold" }}
          className="mx-3 font-semibold text-3xl mb-5"
        >
          Trainees
        </Text>
        {/* Fiter section */}
        <View className="flex flex-row w-[100%] ">
          <TouchableOpacity
            className="w-[50%]  flex flex-col items-center justify-center"
            onPress={() => handlePress("button1")}
          >
            <Text>My Trainees</Text>
            <View
              className={activeTab === "button1" ? active : inactive}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[50%] flex flex-col items-center justify-center"
            onPress={() => handlePress("button2")}
          >
            <Text>Assigned Trainees </Text>
            <View
              className={activeTab === "button2" ? active : inactive}
            ></View>
          </TouchableOpacity>
        </View>
        {/* End of filter section */}
        <View className="border border-slate-500 rounded-full flex flex-row items-center mb-5 mt-5 px-2 mx-8">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput className="w-full p-2 " placeholder="search by name" />
        </View>
        <View className="mt-3">
          <ScrollView>
            {activeTab === "button1" ? (
              <>
                <View>
                  <Trainee />
                  <Trainee />
                  <Trainee />
                  <Trainee />
                </View>
              </>
            ) : (
              <>
                <Trainee />
              </>
            )}
          </ScrollView>

          <FAB
            onPress={() => router.push("/(routes)/add-meal")}
            placement="right"
            title="+"
            color="red"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
