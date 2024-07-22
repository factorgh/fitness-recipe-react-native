import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import NotificationItem from "@/components/notificationItem";
import { router } from "expo-router";

export default function NotificationsScreen() {
  return (
    <SafeAreaView>
      <LinearGradient className="h-screen " colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView className="mb-10">
          {/* Header section  */}
          <View className="flex-row items-center mx-5 mt-5 justify-between">
            <Feather
              onPress={() => router.back()}
              name="corner-up-left"
              size={24}
              color="black"
            />
            <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 20 }}>
              Notifications
            </Text>
            <Feather name="settings" size={24} color="black" />
          </View>
          {/* List of Notifications  */}
          <Text
            style={{
              fontFamily: "Nunito_700Bold",
              fontSize: 20,
              marginTop: 30,
              marginLeft: 15,
            }}
          >
            Alerts
          </Text>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
