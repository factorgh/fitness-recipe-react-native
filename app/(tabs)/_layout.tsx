import useUser from "@/hooks/useUser";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  const { user } = useUser();
  console.log("<---------user on tab screen --------->", user);
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
      <Tabs.Screen name="index" />
      <Tabs.Screen name="mealplans/index" />
      <Tabs.Screen name="trainees/index" />
      <Tabs.Screen name="settings/index" />
    </Tabs>
  );
}
