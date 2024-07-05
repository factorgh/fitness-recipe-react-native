import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    username: "",
  });

  const toast = useToast();
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const [passwordVisibility, setPasswordVisbility] = useState(false);
  const [error, setError] = useState({
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    username: "",
  });

  if (!fontLoaded && !fontError) return null;

  ///Handle signiup

  const handleSignUp = async () => {
    console.log({
      name: userInfo.fullName,
      password: userInfo.password,
      phoneNumber: userInfo.phoneNumber,
      email: userInfo.email,
      username: userInfo.username,
    });
    ///Validate logins
    if (
      !userInfo.password ||
      !userInfo.username ||
      !userInfo.email ||
      !userInfo.fullName ||
      !userInfo.phoneNumber
    ) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setButtonSpinner(true);
    //Send post request to backend
    await axios
      .post(`${SERVER_URL}/api/v1/auth/register`, {
        name: userInfo.fullName,
        password: userInfo.password,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email,
        username: userInfo.username,
      })
      .then(async (res) => {
        ///Send toast after signuP
        console.log(res.data);
        await AsyncStorage.setItem("access_token", res.data.token);
        setButtonSpinner(false);
        router.push("/(routes)/roles");
        toast.show("Account created successfully!", { type: "success" });

        setUserInfo({
          password: "",
          fullName: "",
          phoneNumber: "",
          email: "",
          username: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setButtonSpinner(false);
        toast.show("Error creating account", { type: "danger" });
      });
  };

  return (
    <ScrollView>
      <View className="flex flex-col justify-center mt-[30px] p-3 mx-2">
        <Text
          style={{ fontFamily: "Nunito_700Bold" }}
          className="mt-[50px] text-2xl"
        >
          Create your account
        </Text>
        <Text
          className="text-slate-500"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          Enter your details to continue
        </Text>
        <View className=" relative">
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3 mt-5 items-center ">
            <Ionicons name="person-sharp" size={24} color="#747474" />
            <TextInput
              keyboardType={"default"}
              value={userInfo.fullName}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, fullName: value })
              }
              placeholder="Enter full name"
              className="w-[80%] "
            />
          </View>
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3  mt-5 items-center ">
            <Fontisto name="person" size={24} color="#747474" />
            <TextInput
              keyboardType={"default"}
              value={userInfo.username}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, username: value })
              }
              placeholder="username"
              className="w-[80%]  "
            />
          </View>
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3 mt-5 items-center ">
            <FontAwesome5 name="phone" size={24} color="#747474" />
            <TextInput
              keyboardType={"phone-pad"}
              value={userInfo.phoneNumber}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, phoneNumber: value })
              }
              placeholder="+1 393939"
              className="w-[80%]   "
            />
          </View>
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3  mt-5  items-center">
            <Fontisto name="email" size={24} color="#747474" />
            <TextInput
              keyboardType={"email-address"}
              value={userInfo.email}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
              placeholder="fitness@recipe.com"
              className="w-[80%] "
            />
          </View>
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3  mt-5 ">
            <FontAwesome name="lock" size={24} color="#747474" />
            <TextInput
              keyboardType={"default"}
              value={userInfo.password}
              onChangeText={(value) => {
                if (value.trim().length < 0) {
                  setError({ ...error, password: "Please enter a password" });
                } else {
                  setError({
                    ...error,
                    password: "",
                  });
                  setUserInfo({ ...userInfo, password: value });
                }
              }}
              placeholder="************"
              secureTextEntry={!passwordVisibility}
              className="w-[80%] "
            />
            <TouchableOpacity
              onPress={() => setPasswordVisbility(!passwordVisibility)}
            >
              {passwordVisibility ? (
                <Ionicons name="eye-outline" size={24} color="#747474" />
              ) : (
                <Ionicons name="eye-off-outline" size={24} color="#747474" />
              )}
            </TouchableOpacity>
          </View>
          {error.password && (
            <Text className="text-red-300">{error.password}</Text>
          )}
        </View>

        <TouchableOpacity
          className="bg-red-500 items-center mt-10 mb-3 p-3 rounded-md"
          onPress={handleSignUp}
        >
          {buttonSpinner ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            <Text
              style={{ fontFamily: "Raleway_700Bold" }}
              className="text-white text-xl  "
            >
              Signup
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex flex-row p-2 items-center justify-center gap-2 ">
          <TouchableOpacity>
            <FontAwesome name="google" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="facebook-with-circle" size={30} color="blue" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row mt-5 items-center justify-center ">
          <Text className="mr-2">Already have an acccount ?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text
              className="text-blue-800"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
