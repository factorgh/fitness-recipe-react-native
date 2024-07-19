import React, { useState } from "react";
import { SpeedDial } from "@rneui/base";
import { Alert, View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@/utils/utils";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";

export default function SpeedDialItem({ item }: { item: any }) {
  const [open, setOpen] = useState(false);

  console.log("<--recipeDetail", item.id);

  // Handle delete alert
  const deleteItem = async (itemId: any) => {
    /////Get access token
    const token = await AsyncStorage.getItem("access_token");
    // Perform your delete operation here (e.g., API call, state update)
    await axios
      .delete(
        `${SERVER_URL}/api/v1/recipe/delete/recipe/`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => Toast.show("Item deleted successfully"))
      .catch((err) => Toast.show("Error deleting item"));
  };

  // Function to show the confirmation alert
  const showDeleteAlert = (itemId: any) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteItem(itemId),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
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
            params: { recipe_id: JSON.stringify(item?.id) },
          })
        }
      />
      <SpeedDial.Action
        icon={{ name: "delete", color: "#fff" }}
        title="Delete"
        onPress={() => showDeleteAlert(item.id)}
      />
    </SpeedDial>
  );
}
