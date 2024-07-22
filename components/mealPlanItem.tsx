import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import { FontAwesome } from "@expo/vector-icons";

import { format } from "date-fns";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { cld } from "@/lib/cloudinary";
import { User } from "@/types/User";
import { AdvancedImage } from "cloudinary-react-native";
// Define TypeScript types
interface MealUser {
  id: number;
  user_id: number;
  date_added: string;
  date_picked: string | null;
  time_picked: string | null;
  createdAt: string;
  updatedAt: string;
  meal_id: number;
}

interface UserDetailsProps {
  userId: number;
}
export default function MealPlanItem({ item }: { item: any }) {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trainee, setTrainee] = useState<User | undefined>(undefined);

  const [userDetails, setUserDetails] = useState<MealUser | undefined>(
    undefined
  );

  // Get trainee details for this meal
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem("access_token");
      const userId =
        item.meal_users.length > 0 ? item.meal_users[0].user_id : null;
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/v1/users/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        setTrainee(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [item.meal_users.user_id]);

  const deleteItem = async (itemId: any) => {
    setIsLoading(true);
    /////Get access token
    const token = await AsyncStorage.getItem("access_token");
    // Perform your delete operation here (e.g., API call, state update)
    await axios
      .delete(`${SERVER_URL}/api/v1/mealplans/delete/trainer/meal/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        data: {
          id: itemId,
        },
      })
      .then((res) => {
        setIsLoading(false);
        Toast.show("Item deleted successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.show("Error deleting item");
      });
  };

  // Function to show the confirmation alert
  const showDeleteAlert = (itemId: any) => {
    Alert.alert(
      "Delete Meal plan",
      "Are you sure you want to delete this meal?",
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

  const handleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };

  // Convert time to human readable

  function formatTime(isoString: any) {
    const date = new Date(isoString);
    return format(date, "hh:mm:ss a"); // 'hh:mm:ss a' formats to 12-hour time with AM/PM
  }

  // Handle Remote data

  let remoteCldImage;
  if (trainee?.img_url) {
    remoteCldImage = cld
      .image(trainee.img_url)
      .resize(thumbnail().width(100).height(100));
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(100).delay(100).springify()}
      className=" shadow-sm mt-5  bg-gray-300 p-5  mx-3 rounded-md w-[370px] h-[250px] mb-3"
    >
      <TouchableOpacity>
        <View className="flex flex-row gap-[50px]">
          <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
          <Text
            style={{ fontFamily: "Nunito_700Bold" }}
            className="text-xl font-mono"
          >
            {item.recipe?.name}
          </Text>
        </View>
      </TouchableOpacity>
      {/* Expanded Section */}

      <View>
        <View className="border border-slate-700 rounded-md h-[0px] mt-3 mb-3"></View>
        <View className="flex flex-row items-center gap-10">
          <FontAwesome name="calendar-times-o" size={24} color="black" />
          <Text style={{ fontFamily: "Nunito_700Bold" }}>
            {formatTime(item.time_picked)}
          </Text>
        </View>
        <View className="border border-slate-700 rounded-md h-[0px] mt-3 mb-3"></View>
        <View>
          <Text className="mb-3" style={{ fontFamily: "Nunito_700Bold" }}>
            Trainees
          </Text>
          <View className="flex flex-row items-center gap-2">
            <View className="flex flex-row">
              {trainee?.img_url ? (
                <AdvancedImage
                  className="w-10 h-10 rounded-full"
                  cldImg={remoteCldImage!}
                />
              ) : (
                <View className="rounded-full w-8 h-8 bg-slate-50"></View>
              )}
            </View>
          </View>
          {/* Buttons for meal plan */}
          <View className="flex flex-row gap-2  justify-end">
            {isLoading ? (
              <ActivityIndicator size={24} color="white" />
            ) : (
              <TouchableOpacity
                onPress={() => showDeleteAlert(item.id)}
                className="bg-red-400 rounded-md"
              >
                <Text
                  style={{ fontFamily: "Nunito_400Regular" }}
                  className="text-slate-50 p-2"
                >
                  Delete
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(routes)/update-meal",
                  params: { mealPlan: JSON.stringify(item) },
                })
              }
              className="border border-slate-500 rounded-md  bg-blue-500"
            >
              <Text
                style={{ fontFamily: "Nunito_400Regular" }}
                className=" p-2 text-white"
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* End of expanded section */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
