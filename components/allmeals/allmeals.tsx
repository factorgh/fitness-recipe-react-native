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
        console.log("<---------fomattedDateTrainer------>", newDate);

        const token = await AsyncStorage.getItem("access_token");
        console.log("<-------tokenOnAllMeals-------->", token);
        await axios
          .get(`${SERVER_URL}/api/v1/mealplans/trainer/${newDate}`, {
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
    <View>
      {loading ? (
        <ActivityIndicator className="mt-10 " size="large" color="blue" />
      ) : data.length === 0 ? (
        <View className=" items-center justify-center mt-10 flex flex-col mb-20">
          <Text>No data Available</Text>
          <TouchableOpacity
            onPress={() => router.push("/(routes)/add-meal")}
            className="border slate-300 bg-red-800 rounded-md p-2 mt-2"
          >
            <Text className="text-white font-semibold">Add plan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: { item: any }) => <MealPlanItem item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
