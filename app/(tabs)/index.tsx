import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "@/screens/home/home.screen";
import useUser from "@/hooks/useUser";
import MealPlan from "./mealplan";

export default function Home() {
  const { user } = useUser();
  console.log("<----USER-ON---INDEX-SCREEN----->", user?.role);
  return user?.role === 1 ? <HomeScreen /> : <MealPlan />;
}

const styles = StyleSheet.create({});
