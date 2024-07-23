import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Allmeals from "@/components/allmeals/allmeals";
import { cld } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import useUser from "@/hooks/useUser";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { AdvancedImage } from "cloudinary-react-native";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";
import { router } from "expo-router";

export default function HomeScreen() {
  useDisableSwipeBack();
  const [date, setDate] = useState<string>("");
  const { user } = useUser();

  const getGreeting = (): string => {
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

  let remoteCldImage;
  if (user?.img_url) {
    remoteCldImage = cld
      .image(user.img_url)
      .resize(thumbnail().width(100).height(100));
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["#E5ECF9", "#F6F7F9"]}>
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/add-meal")}
              style={styles.addButton}
            >
              <Entypo name="add-to-list" size={30} color="black" />
            </TouchableOpacity>
            <Animated.View
              entering={FadeInLeft.duration(200).springify()}
              style={styles.userStatusContainer}
            >
              {user?.img_url ? (
                <AdvancedImage
                  style={styles.userImage}
                  cldImg={remoteCldImage!}
                />
              ) : (
                <View style={styles.notificationCircle} />
              )}
              <Text style={styles.userRoleText}>
                {user?.role === 0 ? "Trainee" : "Trainer"}
              </Text>
            </Animated.View>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <CalendarPicker onDateChange={handleDateChange} />
        </View>

        <View style={styles.mealPlansContainer}>
          <Text style={styles.mealPlansText}>Manage Plans</Text>
        </View>

        <Animated.View style={styles.listContainer}>
          <Allmeals date={date} />
        </Animated.View>
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
    fontFamily: "Nunito_400Regular",
    fontSize: 24,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addButton: {
    marginRight: 10,
  },
  userStatusContainer: {
    width: 80,
    height: 30,
    borderRadius: 15,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    gap: 5,
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userRoleText: {
    fontSize: 10,
    color: "white",
  },
  notificationCircle: {
    width: 20,
    height: 20,
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
