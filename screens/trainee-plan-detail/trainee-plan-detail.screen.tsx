import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {  useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealDetailScreen() {
  const [isBookmarked, setIsBookMarked] = useState(false);
  const [open,setOpen] = useState(false);
  ///Bottom sheet Ref

  return (
    <SafeAreaView>
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
   
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{  height: "100%" }}>
            <Image
              style={{ width: "100%", height: 230,}}
              source={require("@/assets/images/recipe.jpeg")}
            />
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
               
                position: "absolute",
                top: 30,
                left: 10,
                padding: 8,
              }}
            >
             <Feather name="arrow-left-circle" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ height: "100%",marginTop:-15,borderRadius:20,backgroundColor:"#fff",paddingHorizontal:10 }} className="">
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
                  Review
                </Text>
               
                {/* Review item  */}
               
               

                <View className="w-full">
                  <TextInput
                  numberOfLines={4}
                  placeholder="Write a comment ..."
                  style={{
                    borderWidth:1,
                    padding:10,
                    borderRadius:10,
                    textAlignVertical:"top",
                    borderColor:Colors.GRAY,
                  
                  }} />
                </View>
                <TouchableOpacity
            onPress={()=> console.log("review submitted")}
            className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md "
          >
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className="text-white text-xl  "
            >
              Submit
            </Text>
          </TouchableOpacity>
                <TouchableOpacity
            onPress={()=> console.log("review submitted")}
            className="bg-blue-500 items-center mt-5 mb-3 p-3 rounded-md "
          >
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className="text-white text-xl  "
            >
              Mark as complete
            </Text>
          </TouchableOpacity>
              </View>
           
            </View>
          </View>
        </ScrollView>
   
    </LinearGradient>
    </SafeAreaView>
  
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

