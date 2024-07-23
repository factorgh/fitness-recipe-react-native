import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLoader from "react-native-animated-loader";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function NotiPlace() {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("@/assets/images/notify.json")}
      animationStyle={{ width: 250, height: 250, zIndex: -1 }}
      speed={1.5}
    >
      <Text
        style={{ fontFamily: "Nunito_700Bold", color: "red", fontSize: 30 }}
      >
        No new Notifications
      </Text>
      <Text
        style={{ fontFamily: "Nunito_400Regular" }}
        className="text-slate-500"
      >
        No notifications available at the moment
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-red-500 w-20 h-10 mt-2 rounded-md items-center justify-center"
      >
        <Text
          style={{ fontFamily: "Nunito_400Regular" }}
          className="text-white"
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </AnimatedLoader>
  );
}
