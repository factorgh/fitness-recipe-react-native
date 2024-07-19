import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { router } from "expo-router";

export default function Trainee() {
  return (
    <TouchableOpacity onPress={() => router.push("/(routes)/trainee-detail")}>
      <View className="flex flex-row items-center justify-between mx-5 mt-3">
        {/* Avatar */}
        <View className=" flex flex-row   ">
          <View className="rounded-full w-8 h-8 bg-slate-300"></View>
          {/* Trainee detail */}
          <View className="ml-10">
            <Text className="font-semibold">John Smith</Text>
            <Text>Poched eggs meal plan</Text>
          </View>
        </View>

        {/* Update assigned date */}
        <Text>Today</Text>
      </View>
      <View className="border border-slate-400 flex w-full  mt-3"></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
