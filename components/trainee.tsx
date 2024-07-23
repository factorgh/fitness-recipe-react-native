import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { router } from "expo-router";

export default function Trainee() {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/(routes)/trainee-detail")}
    >
      <View style={styles.row}>
        {/* Avatar */}
        <Avatar
          rounded
          size="medium"
          source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }} // Example avatar image
          containerStyle={styles.avatar}
        />
        {/* Trainee detail */}
        <View style={styles.details}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.plan}>Poached eggs meal plan</Text>
        </View>
      </View>

      {/* Update assigned date */}
      <Text style={styles.date}>Today</Text>

      {/* Divider */}
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#E5ECF9",
  },
  details: {
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plan: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 14,
    color: "#888",
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ddd",
  },
});
