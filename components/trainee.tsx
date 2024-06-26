import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";

export default function Trainee() {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mx-5 mt-3">
        {/* Avatar */}
        <View className=" flex flex-row   ">
          <Avatar
            size={32}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          {/* Trainee detail */}
          <View className="ml-10">
            <Text className="font-semibold">John Smith</Text>
            <Text>Poched eggs meal plan</Text>
          </View>
        </View>

        {/* Update assigned date */}
        <Text>Today</Text>
      </View>
      <View className="border border-red-200  bg-red-200 flex w-full  mt-3 mx-3"></View>
    </View>
  );
}

const styles = StyleSheet.create({});
