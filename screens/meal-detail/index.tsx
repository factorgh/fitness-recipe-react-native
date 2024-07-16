import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import StarRating from "react-native-star-rating-widget";

import ReviewItem from "@/components/ReviewItem";
import SpeedDialItem from "@/components/speed-dial";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/lib/cloudinary";
import { Toast } from "react-native-toast-notifications";

export default function MealDetailScreen() {
  const [rating, setRating] = useState(0);
  const [submit, setSubmit] = useState("");
  const [isBookmarked, setIsBookMarked] = useState(false);
  const { item } = useLocalSearchParams();
  console.log(item);

  ///Convert string back to object
  let recipeData;
  if (typeof item === "string") {
    try {
      recipeData = JSON.parse(item);
      console.log(recipeData);
    } catch (err) {
      console.log("error parsing data", err);
    }
  } else {
    console.log("An error occured");
  }

  const cloudThumbnail = cld.image(recipeData.thumbNail);

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: "100%" }}>
          <AdvancedImage
            style={{ width: "100%", height: 230 }}
            cldImg={cloudThumbnail}
          />

          <View
            style={{
              height: "100%",
              marginTop: -15,
              borderRadius: 20,
              backgroundColor: "#fff",
              paddingHorizontal: 10,
            }}
            className=""
          >
            <View className="flex flex-row justify-between items-center mt-5 p-2">
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-black text-xl font-mono"
              >
                {recipeData.name}
              </Text>
              {isBookmarked ? (
                <TouchableOpacity
                  onPress={() => setIsBookMarked(!isBookmarked)}
                >
                  <FontAwesome name="bookmark" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsBookMarked(!isBookmarked)}
                >
                  <FontAwesome name="bookmark-o" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
            {/* Review section */}
            <View className="flex flex-row items-center gap-2 mb-2">
              <StarRating starSize={24} onChange={setRating} rating={rating} />

              <Text className="text-slate-500 text-sm text-bold">{rating}</Text>
            </View>
            {/* Description section  */}
            <View className="p-2 ">
              <Text
                className="text-slate-500"
                style={{ fontFamily: "Nunito_700Bold" }}
              >
                {recipeData.description}
              </Text>
            </View>
            {/* Ingredients section */}
            <View className="p-2 mt-5 text-slate-400 mb-5">
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-xl font-semibold"
              >
                Ingredients
              </Text>
              <View className="bg-slate-900 h-1 rounded-md w-28 mb-2 "></View>
              <View>
                {recipeData.ingredients.split(",").map((item: any) => (
                  <Text key={item}>{item}</Text>
                ))}
              </View>
            </View>
            {/* Procedures section */}
            <View className="mx-2">
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-xl font-semibold"
              >
                Procedures
              </Text>
              <View className="bg-slate-900 h-1 rounded-md w-28 mb-2 "></View>
              <View>
                <Text>{recipeData.procedures}</Text>
              </View>
            </View>

            {/* Review detail section */}
            <View className="mt-10">
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-xl font-semibold mb-3 mx-2"
              >
                Reviews
              </Text>

              {/* Review item  */}

              <View className="w-full">
                <TextInput
                  numberOfLines={4}
                  placeholder="Write a comment ..."
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    textAlignVertical: "top",
                    borderColor: Colors.GRAY,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{ marginBottom: 80 }}
                onPress={() => {
                  Toast.show("Review submitted");
                  router.back();
                }}
                className="bg-blue-500 items-center mt-5 mb-3 p-3 rounded-md "
              >
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-white text-xl  "
                >
                  Submit Review
                </Text>
              </TouchableOpacity>
              <SpeedDialItem item={recipeData} />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
