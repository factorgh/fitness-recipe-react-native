import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TraineePendingCard() {
  return (
    <TouchableOpacity
      onPress={() => router.push("/(routes)/trainee-pending-detail")}
      style={styles.container}
    >
      <View style={styles.row}>
        <MaterialCommunityIcons name="food-variant" size={24} color="gray" />
        <Text style={styles.text}>Vegetable Salads</Text>
        <FontAwesome name="spinner" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#F6F7F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginHorizontal: 10,
  },
});
