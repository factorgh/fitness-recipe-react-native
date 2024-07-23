import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import NotificationItem from "@/components/notificationItem";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";
import NotiPlace from "@/components/notifyPlace";

export default function NotificationsScreen() {
  useDisableSwipeBack();

  let notifications = [];

  const handleHeaderClick = () => {
    // Handle the header click event here
    console.log("Header clicked");
    // You can navigate or perform any action here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.gradient}>
        <View style={styles.header}></View>
        <ScrollView contentContainerStyle={styles.content}>
          {notifications.length === 0 ? (
            <View style={styles.placeholderContainer}>
              <NotiPlace />
            </View>
          ) : (
            <>
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
            </>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
  },
  content: {
    paddingBottom: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300, // Adjust this height as needed
  },
});
