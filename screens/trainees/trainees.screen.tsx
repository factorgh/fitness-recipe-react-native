import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function TraineesScreen() {
  const [activeTab, setActiveTab] = useState("button1");

  const active = `border border-red-500  bg-red-500 flex w-full h-1 mt-3`;
  const inactive = `border border-red-200  bg-red-500 flex w-[100%] mt-3`;

  const handlePress = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <View className="mt-[50px]">
      <Text className="mx-3 font-semibold text-2xl mb-3">Trainees</Text>
      {/* Fiter section */}
      <View className="flex flex-row w-[100%] ">
        <TouchableOpacity
          className="w-[50%]  flex flex-col items-center justify-center"
          onPress={() => handlePress("button1")}
        >
          <Text>My Trainees</Text>
          <View className={activeTab ? active : inactive}></View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[50%] flex flex-col items-center justify-center"
          onPress={() => handlePress("button2")}
        >
          <Text>Assigned Trainees </Text>
          <View className={activeTab ? active : inactive}></View>
        </TouchableOpacity>
      </View>
      {/* End of filter section */}
      <View className="border border-slate-500 rounded-full flex flex-row items-center mt-3 px-2 mx-8">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput className="w-full p-2 " placeholder="search by name" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
