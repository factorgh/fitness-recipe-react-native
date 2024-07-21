import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Trainee from "@/components/trainee";

import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInLeft } from "react-native-reanimated";
import useUser from "@/hooks/useUser";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export default function TraineesScreen() {
  const [activeTab, setActiveTab] = useState("button1");
  const [trainees, setTrainees] = useState([]);
  const { user } = useUser();

  const active = `border border-red-500  bg-red-500 flex w-full h-1 mt-3`;
  const inactive = `border border-red-200  bg-red-500 flex w-[100%] mt-3`;

  const handlePress = (tab: any) => {
    setActiveTab(tab);
  };

  // Get user traineees
  useEffect(() => {
    async function getTrainees() {
      const token = await AsyncStorage.getItem("access_token");
      const res = await axios
        .post(`${SERVER_URL}/api/v1/trainer`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.trainee);
          setTrainees(res.data.trainee);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTrainees();
  }, []);

  let remoteCldImage;
  if (user?.img_url) {
    remoteCldImage = cld
      .image(user.img_url)
      .resize(thumbnail().width(100).height(100));
  }

  return (
    <SafeAreaView>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
        <View className="mt-[30px]">
          <View className="flex-row justify-between mx-3 mb-3 ">
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className=" font-semibold text-3xl mb-5"
            >
              Trainees
            </Text>
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
          {/* Fiter section */}
          <View className="flex flex-row w-[100%] ">
            <TouchableOpacity
              className="w-[50%]  flex flex-col items-center justify-center"
              onPress={() => handlePress("button1")}
            >
              <Text>My Trainees</Text>
              <View
                className={activeTab === "button1" ? active : inactive}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[50%] flex flex-col items-center justify-center"
              onPress={() => handlePress("button2")}
            >
              <Text>Assigned Trainees </Text>
              <View
                className={activeTab === "button2" ? active : inactive}
              ></View>
            </TouchableOpacity>
          </View>
          {/* End of filter section */}
          <View className="border border-slate-500 rounded-full flex flex-row items-center mb-5 mt-5 px-2 mx-8">
            <AntDesign name="search1" size={24} color="black" />
            <TextInput className="w-full p-2 " placeholder="search by name" />
          </View>
          <View className="mt-3">
            <ScrollView>
              {activeTab === "button1" ? (
                <>
                  <View className="mx-3">
                    <Trainee />
                  </View>
                </>
              ) : (
                <>
                  <Trainee />
                </>
              )}
            </ScrollView>
          </View>
        </View>
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
