import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MealPlanItem from "../mealPlanItem";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUser from "@/hooks/useUser";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import TraineePlanItem from "../traineePlan";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";
import Animated, { FadeInDown } from "react-native-reanimated";

// Uitlity function
const setToMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};
export default function Allmeals({ date }: { date: any }) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  ///GELL All meal plans
  useEffect(
    function () {
      const fetchData = async () => {
        setLoading(true);
        const newDate = setToMidnight(date);
        console.log("<---------fomattedDateTrainee------>", newDate);

        const token = await AsyncStorage.getItem("access_token");
        console.log("<-------tokenOnAllMeals-------->", token);
        await axios
          .get(`${SERVER_URL}/api/v1/mealplans/trainee/${newDate}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          })
          .then((response) => {
            console.log(
              "<---------response from date filter------------>",
              response.data
            );
            setData(response.data.meal);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      };
      fetchData();
    },
    [date]
  );

  return (
    <Animated.View
      entering={FadeInDown.duration(50).springify()}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No meal plan Available</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: { item: any }) => (
            <TraineePlanItem item={item} />
          )}
          contentContainerStyle={styles.listContent} // Added for styling
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20, // Adjust padding as needed
  },
});
