import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AddMealPlan() {
  const [activeButton, setActiveButton] = useState(null);
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  if (!fontLoaded && !fontError) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="mt-[50px] mx-5">
        {/* header section */}
        <View className="flex flex-row items-center justify-between mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text
            className="text-xl font-semibold"
            style={{ fontFamily: "Raleyway_700Bold" }}
          >
            Add a meal plan
          </Text>
          <Text>1/2</Text>
        </View>
        {/* End of header section */}
        {/* Thumbnail */}
        <View className="gap-2">
          <Text>Add thumbnail image</Text>
          <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center">
            <AntDesign name="clouduploado" size={35} color="black" />
          </View>
        </View>
        {/* End of thumbnail */}
        <View className="gap-2 mt-3">
          <Text>Enter meal name</Text>
          <View className="border-2 border-slate-300 w-full rounded-md  p-3 h-[50px] flex items-center justify-center">
            <TextInput className="w-full h-full " />
          </View>
        </View>
        {/* End of meal name */}
        <View className="gap-2 mt-3">
          <Text>Description</Text>
          <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] p-2 å flex items-center justify-center">
            <TextInput
              value=""
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              className="w-[100%] h-[100%]"
            />
          </View>
        </View>
        {/* End of descitpion */}
        <View className="gap-2 mt-3">
          <Text>Add recipe ingredients</Text>
          <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center p-2">
            <TextInput
              value=""
              editable={true}
              multiline
              numberOfLines={6}
              maxLength={40}
              className="w-[100%] h-[100%]"
            />
          </View>
        </View>
        {/* Procedures*/}
        <View className="gap-2 mt-3">
          <Text>Procedures</Text>
          <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center p-2">
            <TextInput
              value=""
              editable={true}
              multiline
              numberOfLines={6}
              maxLength={40}
              className="w-[100%] h-[100%]"
            />
          </View>
        </View>
        {/* End of procedures*/}
        {/* Next button */}
        {activeButton ? (
          <TouchableOpacity className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md ">
            <Text
              style={{ fontFamily: "Raleway_700Bold" }}
              className="text-white text-xl  "
            >
              Proceed
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="bg-red-200 items-center mt-5 mb-3 p-3 rounded-md">
            <Text
              style={{ fontFamily: "Raleway_700Bold" }}
              className="text-white text-xl  "
            >
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
