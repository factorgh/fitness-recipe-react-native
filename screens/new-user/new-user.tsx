import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function NewUserScreen() {
  useDisableSwipeBack();
  return (
    <SafeAreaView>
      <View className="border border-slate-300 rounded-full flex flex-row items-center mt-3 px-2">
        <AntDesign name="search1" size={24} color="black" />
        <TextInput className="w-full p-3 " placeholder="search by name" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
