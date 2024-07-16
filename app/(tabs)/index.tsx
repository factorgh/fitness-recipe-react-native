import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "@/screens/home/home.screen";
import useUser from "@/hooks/useUser";
import MealPlan from "./mealplan";
import MyLoader from "@/components/loader";

export default function Home() {
  const { user, isLoading } = useUser();
  console.log("<----USER-ON---INDEX-SCREEN----->", user?.role);

  return (
    <>
      {isLoading ? (
        <MyLoader />
      ) : user?.role === 1 ? (
        <HomeScreen />
      ) : (
        <MealPlan />
      )}
    </>
  );
}
