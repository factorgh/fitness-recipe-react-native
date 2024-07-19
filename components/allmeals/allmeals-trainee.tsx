import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TraineePlanItem from "../traineePlan";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUser from "@/hooks/useUser";
import { Toast } from "react-native-toast-notifications";

// Utility function
const setToMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export default function AllmealsTrainee({ date }: { date: any }) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  // Fetch All meal plans
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newDate = setToMidnight(date);

      const token = await AsyncStorage.getItem("access_token");
      console.log("<-------tokenOnAllMeals-------->", token);
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/v1/mealplans/trainee/${newDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        console.log(
          "<---------response from date filter------------>",
          response.data
        );
        setData(response.data.meal);
      } catch (err) {
        Toast.show("No data Available");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No meal plan Available</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: { item: any }) => (
            <TraineePlanItem item={item} />
          )}
          contentContainerStyle={styles.listContent} // Added for styling
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
