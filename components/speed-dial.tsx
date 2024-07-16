import React, { useState } from "react";
import { SpeedDial } from "@rneui/base";
import { View } from "react-native";
import { router } from "expo-router";

export default function SpeedDialItem({ item }: { item: any }) {
  const [open, setOpen] = useState(false);
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
    </SpeedDial>
  );
}
