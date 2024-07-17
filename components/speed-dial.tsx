import React, { useState } from "react";
import { SpeedDial } from "@rneui/base";
import { Alert, View } from "react-native";
import { router } from "expo-router";

export default function SpeedDialItem({ item }: { item: any }) {
  const [open, setOpen] = useState(false);

  const showAlert = () =>
    Alert.alert(
      "Delete recipe",
      "Are sure you want to delete this recipe",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  return (
    <SpeedDial
      overlayColor="transparent"
      isOpen={open}
      icon={{ name: "edit", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Assign"
        onPress={() => router.push("/(routes)/add-trainee-to-plan")}
      />
      <SpeedDial.Action
        icon={{ name: "update", color: "#fff" }}
        title="Update"
        onPress={() =>
          router.push({
            pathname: "/(routes)/update-recipe",
            params: { recipe: JSON.stringify(item) },
          })
        }
      />
      <SpeedDial.Action
        icon={{ name: "delete", color: "#fff" }}
        title="Delete"
        onPress={showAlert}
      />
    </SpeedDial>
  );
}
