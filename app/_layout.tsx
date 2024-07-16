import { View, Text } from "react-native";

import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

const _layout = () => {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/login/index" />
        <Stack.Screen name="(routes)/signup/index" />
        <Stack.Screen name="(routes)/roles/index" />
        <Stack.Screen name="(routes)/add-meal/index" />
        <Stack.Screen name="(routes)/trainee-detail/index" />
        <Stack.Screen name="(routes)/assign-meal/index" />
        <Stack.Screen name="(routes)/profile/index" />
        <Stack.Screen name="(routes)/create-recipe/index" />
        <Stack.Screen name="(routes)/update-recipe/index" />
        <Stack.Screen name="(routes)/notifications/index" />
        <Stack.Screen name="(routes)/trainee-completed-detail/index" />
        <Stack.Screen name="(routes)/trainee-pending-detail/index" />
        <Stack.Screen name="(routes)/help-and-support/index" />
        <Stack.Screen name="(routes)/add-trainee-to-plan/index" />
        <Stack.Screen
          options={{
            presentation: "modal",
          }}
          name="(routes)/trainee-plan-detail/index"
        />
        <Stack.Screen
          options={{
            headerBackTitle: "Back",
            title: "Recipe Details",
            headerShown: true,
          }}
          name="(routes)/meal-detail/index"
        />
        <Stack.Screen name="(routes)/forgotPassword/index" />
      </Stack>
    </ToastProvider>
  );
};

export default _layout;
