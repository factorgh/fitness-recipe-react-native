import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealDetailScreen() {
  const [isBookmarked, setIsBookMarked] = useState(false);
  ///Bottom sheet Ref

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginHorizontal: 10, marginTop: 16, height: "100%" }}>
            <Image
              style={{ width: "100%", height: 230, borderRadius: 16 }}
              source={require("@/assets/images/onboarding_1.png")}
            />

            <View className="h-10 ">
              <View>
                <Text className="text-black">Vegetable Salads with potato</Text>
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
