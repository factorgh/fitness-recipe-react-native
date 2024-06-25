import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { router } from "expo-router";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";

type OnboardingItem = {
  key: number;
  title: string;
  text: string;
  image: any;
};

const slides: OnboardingItem[] = [
  {
    key: 1,
    title: "Personalized Nutrition.",
    text: "Tailored for you",
    image: require("@/assets/images/onboarding_1.png"),
  },
  {
    key: 2,
    title: "Stay on track.Every bite",
    text: "counts",
    image: require("@/assets/images/onboarding_2.png"),
  },
  {
    key: 3,
    title: "Nutrition made easy.One",
    text: "bite at a time",
    image: require("@/assets/images/onboarding_3.png"),
  },
];

const renderItem = ({ item }: { item: OnboardingItem }) => (
  <View className="flex-1">
    <ImageBackground
      source={item.image}
      resizeMode="cover"
      className="flex-1 justify-end p-3 "
    >
      <Text
        style={{ fontFamily: "Nunito_400Regular" }}
        className=" text-white text-3xl mb-3"
      >
        {item.title}
      </Text>
      <Text
        style={{ fontFamily: "Nunito_400Regular" }}
        className=" text-white text-3xl mb-[220px]"
      >
        {item.text}
      </Text>
    </ImageBackground>
  </View>
);

export default function OnboardingScreen() {
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  if (!fontLoaded && !fontError) return null;
  return (
    <AppIntroSlider
      onDone={() => {
        router.push("/signup");
      }}
      onSkip={() => {
        router.push("/login");
      }}
      renderDoneButton={() => (
        <View className="bg-red-800 flex items-center p-5 rounded-md mt-5 mb-10">
          <Text
            style={{ fontFamily: "Raleway_700Bold" }}
            className="text-white"
          >
            Done
          </Text>
        </View>
      )}
      renderNextButton={() => (
        <View className="bg-red-800 flex items-center p-5 rounded-md ">
          <Text
            style={{ fontFamily: "Raleway_700Bold" }}
            className="text-white"
          >
            Next
          </Text>
        </View>
      )}
      renderSkipButton={() => (
        <View className="bg-white flex items-center p-5 rounded-md mt-5 mb-3">
          <Text
            style={{ fontFamily: "Raleway_700Bold" }}
            className="text-slate-500 font-semibold "
          >
            Login
          </Text>
        </View>
      )}
      dotStyle={{ backgroundColor: "red" }}
      activeDotStyle={{ backgroundColor: "white" }}
      bottomButton={true}
      showSkipButton={true}
      data={slides}
      renderItem={renderItem}
    />
  );
}
