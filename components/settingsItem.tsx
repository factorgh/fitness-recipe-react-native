import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function SettingsItem({
  icon,
  text,
  onPress,
}: {
  icon: any;
  text: any;
  onPress: any;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex flex-row justify-between items-center mx-5 p-2 mt-2">
        {/* iCONS */}
        <View className="flex flex-row gap-5">
          {icon}
          <Text className="text-xl">{text}</Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <View className="border border-slate-200  bg-slate-300 flex w-full  mt-3 mx-3"></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
