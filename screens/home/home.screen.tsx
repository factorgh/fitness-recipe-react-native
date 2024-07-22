import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import CalendarPicker from "react-native-calendar-picker";
import { Entypo } from "@expo/vector-icons";

import { router } from "expo-router";

import Allmeals from "@/components/allmeals/allmeals";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/hooks/useUser";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { cld } from "@/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function HomeScreen() {
  useDisableSwipeBack();
  const [date, setDate] = useState("");
  const { user } = useUser();

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
    console.log(dateSelected);
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
    <SafeAreaView>
      <LinearGradient className="h-full" colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full  mt-[15px] flex flex-row justify-between p-3 ">
            <Text
              style={{ fontFamily: "Nunito_400Regular" }}
              className="text-2xl"
            >
              {greeting}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <TouchableOpacity
                onPress={() => router.push("/(routes)/add-meal")}
              >
                <Entypo name="add-to-list" size={30} color="black" />
              </TouchableOpacity>
              <View>
                <Animated.View
                  entering={FadeInLeft.duration(200).springify()}
                  style={{
                    width: 80,

                    height: 30,
                    display: "flex",
                    borderRadius: 15,
                    backgroundColor: "red",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 5,
                    gap: 5,
                  }}
                >
                  {user?.img_url ? (
                    <AdvancedImage
                      className="w-5 h-5 rounded-full"
                      cldImg={remoteCldImage!}
                    />
                  ) : (
                    <View style={styles.notificationCircle} />
                  )}

                  <Text style={{ fontSize: 10, color: "white" }}>
                    {user?.role === 0 ? "Trainee" : "Trainer"}
                  </Text>
                </Animated.View>
              </View>
              <Avatar
                size={32}
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
            </View>
          </View>

          {/* End of first section */}
          {/* Calendar section */}
          <View className=" mt-3 ">
            <CalendarPicker onDateChange={handleDateChange} />
          </View>
          {/* End of calendar section */}

          <View className="mt-5 mx-3">
            <Text className="text-2xl" style={{ fontFamily: "Nunito_700Bold" }}>
              Manage Plans
            </Text>
          </View>
          <View>
            <Allmeals date={date} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notificationCircle: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: "#D1D5DB",
  },
});
