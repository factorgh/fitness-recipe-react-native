import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NotificationItem() {
  return (
    <View className=" h-24 p-3 mx-3 bg-slate-100 shadow-xl rounded-md mt-5 flex-row items-start mb-3 ">
      {/* Notification user preview */}
      <View className="rounded-full w-8 h-8  bg-red-300 flex items-center justify-center mr-3">
        <Text
          style={{
            fontFamily: "Nunito_700Bold",
            fontSize: 20,
          }}
        >
          V
        </Text>
      </View>
      {/* Notification details */}
      <View>
        <View className="flex-row items-center mb-2 ">
          {/* First section  */}
          <Text style={{ fontFamily: "Nunito_700Bold" }} className="mr-10">
            Vista Rewards club ...
          </Text>
          <View className="flex-row  items-center gap-2">
            <Text style={{ fontFamily: "Nunito_700Bold" }}>Jul 18,2024</Text>
            <View className="h-2 w-2 rounded-full bg-red-400"></View>
          </View>
        </View>
        <Text style={{ fontFamily: "Nunito_400Regular" }}>
          Earn points without making a purchase
        </Text>
        <Text style={{ fontFamily: "Nunito_400Regular" }}>
          Complete your first mission today!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
