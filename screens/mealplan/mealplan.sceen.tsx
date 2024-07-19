import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AllmealsTrainee from "@/components/allmeals/allmeals-trainee";

export default function MealPlanScreen() {
  const [date, setDate] = useState("");

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 11) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleDateChange = (dateSelected: any) => {
    setDate(dateSelected);
  };

  const greeting = getGreeting();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["#E5ECF9", "#F6F7F9"]}>
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationCircle} />
            <Ionicons name="notifications-circle" size={35} color="#747474" />
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <CalendarPicker onDateChange={handleDateChange} />
        </View>

        <View style={styles.mealPlansContainer}>
          <Text style={styles.mealPlansText}>Upcoming meal plans</Text>
        </View>

        <View style={styles.listContainer}>
          <AllmealsTrainee date={date} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 15,
  },
  greetingText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 24,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  notificationCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#D1D5DB",
  },
  calendarContainer: {
    marginTop: 15,
  },
  mealPlansContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  mealPlansText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 10,
  },
});
