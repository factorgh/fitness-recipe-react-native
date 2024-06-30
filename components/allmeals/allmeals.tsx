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

export default function Allmeals({ date }: { date: any }) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  ///GELL All meal plans
  useEffect(
    function () {
      const fetchData = async () => {
        setLoading(true);

        const token = await AsyncStorage.getItem("access_token");
        console.log("<-------tokenOnAllMeals-------->", token);
        await axios
          .get(`${SERVER_URL}/api/v1/mealplans/trainer/${date}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          })
          .then((response) => {
            console.log(
              "<---------response from date filter------------>",
              response.data.meal
            );
            setData(response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching data:", err.message);

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
        <ActivityIndicator className="mt-10" size="large" color="blue" />
      ) : data.length === 0 ? (
        <View className=" items-center justify-center mt-10 flex flex-col mb-10">
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
          renderItem={({ item }) => <MealPlanItem />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
