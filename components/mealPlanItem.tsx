import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";

export default function MealPlanItem() {
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    Alert.alert("Confirm delete meal plan ", "Delete meal plan");
  };

  const handleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };
  const expandedStyle = `border-x-4 border-red-300 mt-5  p-5  mx-3 rounded-md h-[250px] `;
  const closedStyle = `border border-red-300 p-5 mt-5 mx-3 rounded-md mb-3`;
  return (
    <View className={expanded ? expandedStyle : closedStyle}>
      <TouchableOpacity onPress={handleExpanded}>
        <View className="flex flex-row gap-[50px]">
          <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
          <Text
            style={{ fontFamily: "Nunito_700Bold " }}
            className="text-xl font-mono"
          >
            Poached Eggs
          </Text>
          {expanded ? (
            <AntDesign name="up" size={20} color="black" />
          ) : (
            <AntDesign name="down" size={20} color="black" />
          )}
        </View>
      </TouchableOpacity>
      {/* Expanded Section */}
      {expanded && (
        <View>
          <View className="border border-slate-200 rounded-md h-[0px] mt-3 mb-3"></View>
          <View className="flex flex-row items-center gap-10">
            <FontAwesome name="calendar-times-o" size={24} color="black" />
            <Text>10:30 AM</Text>
          </View>
          <View className="border border-slate-200 rounded-md h-[0px] mt-3 mb-3"></View>
          <View>
            <Text className="mb-3">Trainees</Text>
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row">
                <Avatar
                  size={32}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <Avatar
                  size={32}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <Avatar
                  size={32}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <Avatar
                  size={32}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
              </View>
              <Text>and 22 others</Text>
            </View>
            {/* Buttons for meal plan */}
            <View className="flex flex-row gap-2 mt-2 justify-end">
              <TouchableOpacity
                onPress={handleDelete}
                className="border border-slate-300 rounded-md"
              >
                <Text className="text-slate-500 p-2">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-slate-300 rounded-md">
                <Text className="text-slate-500 p-2">Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {/* End of expanded section */}
    </View>
  );
}

const styles = StyleSheet.create({});
