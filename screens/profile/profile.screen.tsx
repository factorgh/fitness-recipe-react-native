import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
// import { SERVER_URL } from "@/utils/utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";
// import useUser from "@/hooks/useUser";

export default function ProfileScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [value, setValue] = useState("");
  const [filteredValue, setFilteredValue] = useState<User[]>([]);

//   const {user} = useUser();
//   console.log("<-------User on profile Screen------->",user)
//   useEffect(function () {
//     async function getAllUser() {
//       const token = await AsyncStorage.getItem("access_token");
//       axios
//         .get(`${SERVER_URL}/api/v1/users`, {
//           headers: {
//             Authorization: `${token}`,
//           },
//         })
//         .then((response) => setUsers(response.data.users))
//         .catch((err) => console.log(err.message));
//     }
//     getAllUser();
//   }, []);

// //   // Filter effect
//   useEffect(
//     function () {
//       // First filter
//       if (value === "") {
//         setFilteredValue([]);
//       } else if (value) {
//         const filtered = users?.filter((user) =>
//           user.username.toLowerCase().includes(value.toLowerCase())
//         );
//         setFilteredValue(filtered);
//       } else {
//         setFilteredValue(users);
//       }
//     },
//     [value, users]
//   );

// const handleTrainerSelect = (name: string)=>{
//   console.log(name)
//   setFilteredValue([])
// }

  console.log("<-----------------all users------------------>", users[0])
  return (
    <SafeAreaView>
      <LinearGradient className="h-screen" colors={["#E5ECF9", "#F6F7F9"]}>
        {/* First view */}
        <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("@/assets/images/bg_profile.jpg")}
          style={{ height: 180 }}
        >
          <Feather
            style={{ position: "absolute", top: 30, left: 10 }}
            onPress={() => router.back()}
            name="corner-up-left"
            size={24}
            color="white"
          />
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: "absolute",
              top: 130,
              left: 150,
            }}
            source={require("@/assets/images/profile.webp")}
          />
        </ImageBackground>
        {/* user details section */}
        <View className="flex-col items-center mt-16 mb-10">
          <Text
            className="text-slate-500"
            style={{ fontFamily: "Nunito_700Bold" }}
          >
            Adroit 360
          </Text>
          <Text
            className="text-slate-500"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            adroit360@gmail.com
          </Text>
        </View>
        {/* Line break through  */}
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            opacity: 0.1,
            marginBottom: 10,
          }}
        ></View>

        {/* Update trainer section  */}

        {/* Other details */}
        <Text
          className="text-slate-900 text-lg ml-5 mb-3 mt-10"
          style={{ fontFamily: "Nunito_700Bold" }}
        >
          Information
        </Text>
        <View
          className="flex flex-row items-center justify-between mx-3 mb-20"
          style={{ marginLeft: 20 }}
        >
          <View className="bg-slate-200 shadow-sm h-16 p-3 rounded-md w-40 flex-row items-center ">
            <FontAwesome name="phone" size={35} color="gray" />
            <View style={{ marginLeft: 10 }}>
              <Text
                className="text-slate-500"
                style={{ fontFamily: "Nunito_400Regular" }}
              >
                Phone
              </Text>
              <Text
                className="text-slate-500"
                style={{ fontFamily: "Nunito_400Regular" }}
              >
                + 0234573893
              </Text>
            </View>
          </View>
          {/* Full name */}
          <View className="bg-slate-200 shadow-sm h-16 p-3 rounded-md w-40 flex-row items-center  ">
            <Ionicons name="person" size={24} color="gray" />
            <View style={{ marginLeft: 10 }}>
              <Text
                className="text-slate-500"
                style={{ fontFamily: "Nunito_400Regular" }}
              >
                Full Name
              </Text>
              <Text
                className="text-slate-500"
                style={{ fontFamily: "Nunito_400Regular" }}
              >
                Adroit 360
              </Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
