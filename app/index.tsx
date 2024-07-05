import React from "react";
import { Redirect } from "expo-router";
import useUser from "@/hooks/useUser";

const index = () => {
  const { user } = useUser();
  // let direction;
  // ////Navigate user based on role

  // if (user?.role === 0) {
  //   direction = "/(tabs)/mealplan";
  // } else if (user?.role === 1) {
  //   direction = "/(tabs)";
  // }
  return <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />;
};

export default index;
