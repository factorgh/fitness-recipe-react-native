import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { format } from "date-fns";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import Animated, { FadeInDown } from "react-native-reanimated";
import { cld } from "@/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { User } from "@/types/User";
import { truncateText } from "@/utils/fomatters";

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

interface MealPlanItemProps {
  item: any;
}

export default function MealPlanItem({ item }: MealPlanItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trainee, setTrainee] = useState<User | undefined>(undefined);
  console.log(item);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem("access_token");
      const userId =
        item.meal_users.length > 0 ? item.meal_users[0].user_id : null;
      console.log(userId);
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
        console.log(response.data);
        setTrainee(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [item.meal_users]);

  const deleteItem = async (itemId: any) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("access_token");
    try {
      await axios.delete(
        `${SERVER_URL}/api/v1/mealplans/delete/trainer/meal/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { id: itemId },
        }
      );
      setIsLoading(false);
      Toast.show("Item deleted successfully");
    } catch (err) {
      setIsLoading(false);
      Toast.show("Error deleting item");
    }
  };

  const showDeleteAlert = (itemId: any) => {
    Alert.alert(
      "Delete Meal Plan",
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

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "hh:mm:ss a");
  };

  const remoteCldImage = trainee?.img_url
    ? cld.image(trainee.img_url).resize(thumbnail().width(100).height(100))
    : null;

  return (
    <Animated.View
      entering={FadeInDown.duration(100).delay(100).springify()}
      style={styles.container}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
        <Text style={styles.recipeName}>{item.recipe?.name}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.separator} />
        <View style={styles.timeContainer}>
          <FontAwesome name="calendar-times-o" size={24} color="black" />
          <Text style={styles.timeText}>{formatTime(item.time_picked)}</Text>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.traineesTitle}>Trainees</Text>
          <View style={styles.traineeImageContainer}>
            {trainee?.img_url ? (
              <AdvancedImage
                style={styles.traineeImage}
                cldImg={remoteCldImage!}
              />
            ) : (
              <View style={styles.traineeImagePlaceholder} />
            )}
          </View>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size={24} color="white" />
            ) : (
              <TouchableOpacity
                onPress={() => showDeleteAlert(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(routes)/update-meal",
                  params: { mealPlan: JSON.stringify(item) },
                })
              }
              style={styles.updateButton}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  recipeName: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    marginLeft: 10,
  },
  details: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: {
    fontFamily: "Nunito_400Regular",
    marginLeft: 5,
  },
  traineesTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  traineeImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  traineeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  traineeImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    padding: 10,
  },
  updateButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito_400Regular",
  },
});
