import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function trainee() {
  return (
    <View className="">
      {/* Avatar */}
      <View className="w-[50px] h-[50px] rounded-full">
        <Image source={require("@/assets/images/onboarding_3.png")} />
      </View>

      {/* Trainee detail */}
      <View className="">
        <Text>John Smith</Text>
        <Text>Poched eggs meal plan</Text>
      </View>

      {/* Update assigned date */}
    </View>
  );
}

const styles = StyleSheet.create({});
