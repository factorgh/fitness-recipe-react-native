import useUser from "@/hooks/useUser";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  const { user } = useUser();
  console.log("<---------user on tab screen --------->", user);
  ////GET get user role and check if user is trianer or trainee
  const isTrainer = 1;

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "index") {
              iconName = require("@/assets/icons/HouseSimple.png");
            } else if (route.name === "mealplans/index") {
              iconName = require("@/assets/icons/BookBookmark.png");
            } else if (route.name === "trainees/index") {
              iconName = require("@/assets/icons/User.png");
            } else if (route.name === "mealplan/index") {
              iconName = require("@/assets/icons/HouseSimple.png");
            } else if (route.name === "settings/index") {
              iconName = require("@/assets/icons/settings.png");
            }
            return (
              <Image
                style={{ width: 25, height: 25, tintColor: color }}
                source={iconName}
              />
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        };
      }}
    >
      <Tabs.Screen
        options={{ href: isTrainer === 1 ? null : "" }}
        name="index"
      />
      <Tabs.Screen
        options={{ href: isTrainer === 1 ? null : "" }}
        name="mealplans/index"
      />
      <Tabs.Screen
        options={{ href: isTrainer === 1 ? null : "" }}
        name="trainees/index"
      />
      <Tabs.Screen
        options={{ href: isTrainer !== 1 ? null : "" }}
        name="mealplan/index"
      />
      <Tabs.Screen name="settings/index" />
    </Tabs>
  );
}
