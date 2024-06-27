import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import useUser from "@/hooks/useUser";

const index = () => {
  const { user } = useUser();
  return <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />;
};

export default index;
