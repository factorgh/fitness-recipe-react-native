import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import ReviewItem from "@/components/ReviewItem";
import { router } from "expo-router";

export default function TraineePlanDetailScreen() {
  const [isBookmarked, setIsBookMarked] = useState(false);
  ///Bottom sheet Ref

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 10, height: "100%" }}>
            <Image
              style={{ width: "100%", height: 230, borderRadius: 16 }}
              source={require("@/assets/images/recipe.jpeg")}
            />

            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: "white",
                position: "absolute",
                top: 30,
                left: 10,
                padding: 8,
              }}
            >
              <Feather name="corner-up-left" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ height: "100%" }} className="">
              <View className="flex flex-row justify-between items-center mt-5 p-2">
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-black text-xl font-mono"
                >
                  Vegetable Salads with potato
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
              <View className="flex flex-row items-center gap-2">
                <View className="flex flex-row gap-2 p-2">
                  <AntDesign name="star" size={20} color="gold" />
                  <AntDesign name="star" size={20} color="gold" />
                  <AntDesign name="star" size={20} color="gold" />
                  <AntDesign name="star" size={20} color="gold" />
                  <AntDesign name="staro" size={20} color="gold" />
                </View>
                <Text className="text-slate-500 text-sm">4.5(32Reviews)</Text>
              </View>
              {/* Description section  */}
              <View className="p-2 ">
                <Text
                  className="text-slate-500"
                  style={{ fontFamily: "Nunito_700Bold" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci, quae facilis officiis qui laudantium exercitationem
                  ad, iste necessitatibus laboriosam commodi quasi iure deleniti
                  itaque amet eum assumenda in esse numquam!
                </Text>
              </View>
              {/* Ingredients section */}
              <View className="p-2 mt-5 text-slate-400 mb-5">
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-xl font-semibold"
                >
                  Ingrdeients
                </Text>
                <View className="bg-slate-900 h-1 rounded-md w-28 mb-2 "></View>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  Cucumber(38 Cal)
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  Cucumber(38 Cal)
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  Cucumber(38 Cal)
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  Cucumber(38 Cal)
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  Cucumber(38 Cal)
                </Text>
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
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  1.Lorem ipsum dolor sit amet consectetur adipisicing
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  2. Lorem ipsum dolor sit amet consectetur adipisicing
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  3. Lorem ipsum dolor sit amet consectetur adipisicing
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  4. Lorem ipsum dolor sit amet consectetur adipisicing
                </Text>
                <Text style={{ fontFamily: "Nunito_400Regular" }}>
                  5. Lorem ipsum dolor sit amet consectetur adipisicing
                </Text>
              </View>
              {/* Review detail section */}
              <View className="mt-10">
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-xl font-semibold mb-3 mx-2"
                >
                  Reviews
                </Text>
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                {/* Review item  */}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
