import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingsItem from "@/components/settingsItem";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsScreen() {
  return (
    <LinearGradient style={{ height: "100%" }} colors={["#E5ECF9", "#F6F7F9"]}>
      <View className="mt-[60px]">
        <Text
          style={{ fontFamily: "Nunito_700Bold" }}
          className="text-3xl font-semibold mx-5 mb-5"
        >
          Settings
        </Text>
        <View className="border border-slate-200  bg-slate-400 flex w-full  mt-3 "></View>

        <ScrollView>
          <View className="h-screen">
            <SettingsItem
              onPress={() => router.push("/(routes)/profile")}
              icon={
                <MaterialIcons name="account-circle" size={30} color="gray" />
              }
              text="Profile"
            />
            <SettingsItem
              onPress={() => router.push("/(routes)/notifications")}
              icon={
                <MaterialIcons
                  name="notifications-active"
                  size={30}
                  color="gray"
                />
              }
              text="Notifications"
            />
            <SettingsItem
              onPress={() => router.push("/(routes)/help-and-support")}
              icon={
                <MaterialCommunityIcons
                  name="help-network-outline"
                  size={30}
                  color="gray"
                />
              }
              text="Help & Support "
            />

            <SettingsItem
              onPress={async () => {
                await AsyncStorage.removeItem("access_token");
                router.push("/(routes)/login");
              }}
              icon={<MaterialIcons name="logout" size={30} color="gray" />}
              text="Logout"
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
