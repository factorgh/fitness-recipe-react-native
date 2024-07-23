import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, FAB } from "@rneui/base";
import MealPlanItem from "@/components/mealPlanItem";
import { LinearGradient } from "expo-linear-gradient";
import TraineePendingCard from "@/components/trainee-pending-card";
import TraineeCompletedCard from "@/components/trainee-completed-card";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export default function TraineeDetailScreen() {
  useDisableSwipeBack();
  const [activeTab, setActiveTab] = useState("button1");
  const { traineeDetail } = useLocalSearchParams();
  let trainee;
  if (typeof traineeDetail === "string") {
    try {
      trainee = JSON.parse(traineeDetail);
      console.log(trainee);
    } catch (err) {
      console.log("error parsing data", err);
    }
  } else {
    console.log("An error occured");
  }

  const active = `border border-red-500  bg-red-500 flex w-full h-1 mt-3`;
  const inactive = `border border-red-200  bg-red-500 flex w-[100%] mt-3`;

  const handlePress = (tab: any) => {
    setActiveTab(tab);
  };

  let remoteCldImage;
  if (trainee?.img_url) {
    remoteCldImage = cld
      .image(trainee.img_url)
      .resize(thumbnail().width(100).height(100));
  }
  return (
    <SafeAreaView>
      <LinearGradient className="h-screen" colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView>
          <View className="mt-8">
            {/* First section  */}
            <View className="flex flex-row items-center justify-between mx-5 mb-5">
              <View className="flex flex-row items-center gap-5">
                <Feather
                  onPress={() => router.back()}
                  name="corner-up-left"
                  size={24}
                  color="black"
                />
                {trainee?.img_url ? (
                  <AdvancedImage
                    className="w-12 h-12 rounded-full"
                    cldImg={remoteCldImage!}
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/blank-profile.png")} // Local asset image
                    style={styles.avatar} // Apply styles to make it look like an Avatar
                  />
                )}
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-slate-800 text-lg"
                >
                  {trainee.name}
                </Text>
              </View>
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </View>
            {/* Filter part */}
            <View className="flex flex-row w-[100%] ">
              <TouchableOpacity
                className="w-[50%]  flex flex-col items-center justify-center"
                onPress={() => handlePress("button1")}
              >
                <Text>Pending</Text>
                <View
                  className={activeTab === "button1" ? active : inactive}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[50%] flex flex-col items-center justify-center"
                onPress={() => handlePress("button2")}
              >
                <Text>Completed</Text>
                <View
                  className={activeTab === "button2" ? active : inactive}
                ></View>
              </TouchableOpacity>
            </View>
            {/* fILTER DETAILS */}
            <View className="mt- mb-32">
              <ScrollView>
                {activeTab === "button1" ? (
                  <>
                    <View className="mx-3 mt-5">
                      <TraineePendingCard />
                      <TraineePendingCard />
                    </View>
                  </>
                ) : (
                  <>
                    <View className="mx-3">
                      <TraineeCompletedCard />
                      <TraineeCompletedCard />
                    </View>
                  </>
                )}
              </ScrollView>
            </View>

            {/* <FAB
              size="large"
              onPress={() => router.push("/(routes)/assign-meal")}
              placement="right"
              title="+"
              color="red"
            /> */}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  avatar: {
    width: 40, // Size of the avatar
    height: 40, // Size of the avatar
    borderRadius: 50, // Rounded corners
    borderWidth: 2, // Border width
    borderColor: "#ccc", // Border color
  },
});
