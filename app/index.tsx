import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUser from "@/hooks/useUser";

const index = () => {
  const { user } = useUser();
  return <Redirect href={!user ? "/(routes)/meal-detail" : "/(tabs)"} />;
};

export default index;
