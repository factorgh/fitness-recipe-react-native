import { View, Text } from "react-native";

import React, { useState } from "react";
import { Link, Slot, Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

const _layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ToastProvider>
      {isLoggedIn ? (
        <View></View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/login/index" />
          <Stack.Screen name="(routes)/signup/index" />
          <Stack.Screen name="(routes)/roles/index" />
          <Stack.Screen name="(routes)/add-meal/index" />
          <Stack.Screen name="(routes)/meal-detail/index" />
          <Stack.Screen name="(routes)/forgotPassword/index" />
        </Stack>
      )}
    </ToastProvider>
  );
};

export default _layout;
