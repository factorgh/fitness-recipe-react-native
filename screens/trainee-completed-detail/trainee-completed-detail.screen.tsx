import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function TraineeCompletedDetailScreen() {
  useDisableSwipeBack();
  const [expanded, setExpanded] = useState(null); // Track which section is expanded

  const handleToggle = (section: any) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.gradient}>
        <View style={styles.header}>
          <AntDesign
            onPress={() => router.back()}
            name="left"
            size={24}
            color="black"
          />
          <Text style={styles.title}>Vegetable Salads</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider}></View>

        {/* Meal content */}
        <View style={styles.mealContent}>
          <Text style={styles.mealTime}>10:30 AM</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.mealDate}>Today</Text>
        </View>

        {/* Drop Down for Ingredients */}
        <View
          style={
            expanded === "ingredients"
              ? styles.expandedSection
              : styles.closedSection
          }
        >
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => handleToggle("ingredients")}
          >
            <Text style={styles.dropdownText}>Ingredients</Text>
            <AntDesign
              name={expanded === "ingredients" ? "up" : "down"}
              size={15}
              color="black"
            />
          </TouchableOpacity>
          {expanded === "ingredients" && (
            <View style={styles.expandedContent}>
              <Text style={styles.subTitle}>Trainees</Text>
              <View style={styles.contentRow}>
                <Text>and 22 others</Text>
              </View>
              {/* Additional content for ingredients */}
            </View>
          )}
        </View>

        {/* Dropdown for Procedures */}
        <View
          style={
            expanded === "procedures"
              ? styles.expandedSection
              : styles.closedSection
          }
        >
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => handleToggle("procedures")}
          >
            <Text style={styles.dropdownText}>Procedures</Text>
            <AntDesign
              name={expanded === "procedures" ? "up" : "down"}
              size={15}
              color="black"
            />
          </TouchableOpacity>
          {expanded === "procedures" && (
            <View style={styles.expandedContent}>
              <Text style={styles.subTitle}>Trainees</Text>
              <View style={styles.contentRow}>
                <Text>and 22 others</Text>
              </View>
              {/* Additional content for procedures */}
            </View>
          )}
        </View>

        {/* Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusValue}>Completed</Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
  },
  title: {
    marginLeft: 16,
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 16,
  },
  mealContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F6F7F9",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  mealTime: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: "#333",
  },
  separator: {
    marginHorizontal: 8,
    color: "#333",
  },
  mealDate: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: "#333",
  },
  expandedSection: {
    backgroundColor: "#E5ECF9",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  closedSection: {
    backgroundColor: "#E5ECF9",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: "#333",
  },
  expandedContent: {
    marginTop: 16,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: "#333",
    marginBottom: 8,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  statusLabel: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: "#333",
  },
  statusValue: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: "#4CAF50", // Green color for "Completed" status
    marginLeft: 8,
  },
});
