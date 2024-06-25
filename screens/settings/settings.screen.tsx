import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingsItem from "@/components/settingsItem";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  return (
    <View className="mt-[60px]">
      <Text className="text-3xl font-semibold mx-3 mb-8">Settings</Text>
      <View className="border border-slate-200  bg-slate-800 flex w-full  mt-3 mx-3"></View>

      <ScrollView>
        <View>
          <SettingsItem
            onPress={() => {}}
            icon={
              <MaterialIcons name="account-circle" size={30} color="black" />
            }
            text="Profile"
          />
          <SettingsItem
            onPress={() => {}}
            icon={
              <MaterialIcons
                name="notifications-active"
                size={30}
                color="black"
              />
            }
            text="Notifications"
          />
          <SettingsItem
            onPress={() => {}}
            icon={
              <MaterialCommunityIcons
                name="help-network-outline"
                size={30}
                color="black"
              />
            }
            text="Help & Support "
          />
          <SettingsItem
            onPress={() => {}}
            icon={
              <FontAwesome name="question-circle-o" size={30} color="black" />
            }
            text="About"
          />
          <SettingsItem
            onPress={async () => {
              await AsyncStorage.clear();
              router.push("/(routes)/login");
            }}
            icon={<MaterialIcons name="logout" size={30} color="black" />}
            text="Logout"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
