import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingsItem from "@/components/settingsItem";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/hooks/useUser";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function SettingsScreen() {
  useDisableSwipeBack();
  const { user } = useUser();

  let remoteCldImage;
  if (user?.img_url) {
    remoteCldImage = cld
      .image(user.img_url)
      .resize(thumbnail().width(100).height(100));
  }
  return (
    <SafeAreaView>
      <LinearGradient
        style={{ height: "100%" }}
        colors={["#E5ECF9", "#F6F7F9"]}
      >
        <View className="mt-[30px]">
          <View className="flex-row justify-between mx-5 items-center mb-5">
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className="text-3xl font-semibold "
            >
              Settings
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
          <View className="border border-slate-200  bg-slate-400 flex w-full   "></View>

          <ScrollView>
            <View className="h-screen">
              <SettingsItem
                onPress={() => router.push("/(routes)/profile")}
                icon={
                  <MaterialIcons
                    name="account-circle"
                    size={30}
                    color="black"
                  />
                }
                text="Profile"
              />
              <SettingsItem
                onPress={() => router.push("/(routes)/notifications")}
                icon={
                  <MaterialIcons
                    name="notifications-active"
                    size={30}
                    color="black"
                  />
                }
                text="Notifications"
              />
              <SettingsItem
                onPress={() => router.push("/(routes)/help-and-support")}
                icon={
                  <MaterialCommunityIcons
                    name="help-network-outline"
                    size={30}
                    color="black"
                  />
                }
                text="Help & Support "
              />

              <SettingsItem
                onPress={async () => {
                  await AsyncStorage.removeItem("access_token");
                  router.replace("/(routes)/login");
                }}
                icon={<MaterialIcons name="logout" size={30} color="black" />}
                text="Logout"
              />
            </View>
          </ScrollView>
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
