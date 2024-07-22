import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function ForgotPasswordScreen() {
  useDisableSwipeBack();
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView>
      <LinearGradient className="h-screen" colors={["#E5ECF9", "#F6F7F9"]}>
        <View className="mx-3 mt-10">
          <View className="flex  flex-row gap-10 ">
            <Feather
              style={{}}
              onPress={() => router.back()}
              name="corner-up-left"
              size={24}
              color="black"
            />
            <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 20 }}>
              Reset your password
            </Text>
          </View>
          {/* End of first section */}
          <View className="mt-10 flex items-center">
            <Text className="mb-3">Email address</Text>
            <View className="border-2 border-slate-100 bg-slate-100 w-full rounded-md  p-3 h-[60px] flex items-center justify-center">
              <TextInput
                placeholder="Enter your email address"
                onChangeText={(value) => setEmail(value)}
                value={email}
                className="w-full h-full "
              />
            </View>
            <View className="bg-red-500 flex items-center p-5 rounded-md mt-5 mb-10 w-full">
              <Text
                style={{ fontFamily: "Raleway_700Bold" }}
                className="text-white"
              >
                Request reset Link
              </Text>
            </View>
            <Text style={{ fontSize: 10 }}>
              Please check your email inbox for a link to reset your password
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
