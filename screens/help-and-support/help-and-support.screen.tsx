import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import FrequentlyAskedQuestions from "@/components/frequently-asked-questions";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function HelpAndSupportScreen() {
  useDisableSwipeBack();
  const list2 = [];
  return (
    <SafeAreaView>
      <LinearGradient
        style={{ height: "100%" }}
        colors={["#E5ECF9", "#F6F7F9"]}
      >
        <View className="flex-row items-center mx-5 mt-5 ">
          <Feather
            onPress={() => router.back()}
            name="corner-up-left"
            size={24}
            color="black"
          />
          <Text
            style={{
              fontFamily: "Nunito_700Bold",
              fontSize: 20,
              marginLeft: 80,
            }}
          >
            Help & Support
          </Text>
        </View>
        {/* Contact section */}
        <View className="bg-slate-100 p-5 mx-5 rounded-md mt-5 flex-row space-x-3">
          {/* Avatar section  */}
          <View className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center ">
            <FontAwesome name="phone" size={24} color="gray" />
          </View>
          <View>
            <Text style={{ fontFamily: "Nunito_400Regular" }}>
              Customer hotline
            </Text>
            <Text
              className="text-red-400"
              style={{ fontFamily: "Nunito_400Regular" }}
            >
              +02345674748
            </Text>
          </View>
        </View>
        {/* Email section  */}
        <View className="bg-slate-100 p-5 mx-5 rounded-md mt-5 flex-row space-x-3">
          {/* Avatar section  */}
          <View className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center p-1 ">
            <Fontisto name="email" size={24} color="gray" />
          </View>
          <View>
            <Text style={{ fontFamily: "Nunito_400Regular" }}>
              Contact our team
            </Text>
            <Text
              className="text-red-400"
              style={{ fontFamily: "Nunito_400Regular" }}
            >
              info@fitnessrecipe.com
            </Text>
          </View>
        </View>
        {/* Frquently asked questions */}
        <Text
          style={{
            fontFamily: "Nunito_700Bold",
            marginTop: 20,
            marginLeft: 20,
            fontSize: 15,
          }}
        >
          Frequently asked questions
        </Text>
        <View className="mx-3 mt-3.5">
          <FrequentlyAskedQuestions title="How do I contact customer support" />
          <FrequentlyAskedQuestions title="How do I reset my password" />
          <FrequentlyAskedQuestions title="How do I update my profile Info" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
