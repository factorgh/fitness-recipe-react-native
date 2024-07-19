import {
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
import { SERVER_URL } from "@/utils/utils";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const toast = useToast();
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const [passwordVisibility, setPasswordVisbility] = useState(false);

  if (!fontLoaded && !fontError) return null;

  ////Handle login

  const handleLogin = async () => {
    console.log({
      password: userInfo.password,

      username: userInfo.username,
    });

    ////Validate the form if user is not availbale
    if (!userInfo.password || !userInfo.username) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setButtonSpinner(true);
    //Send post request to backend
    await axios
      .post(`${SERVER_URL}/api/v1/auth/login`, {
        password: userInfo.password,
        username: userInfo.username,
      })
      .then(async (res) => {
        ///Send toast after login
        console.log(res.data);
        await AsyncStorage.setItem("access_token", res.data.token);
        setUserInfo({
          password: "",
          username: "",
        });
        setButtonSpinner(false);
        toast.show("Logged In successfully!", { type: "success" });
        router.push("/(tabs)");
      })
      .catch((error) => {
        console.log(error.data);
        setUserInfo({
          password: "",
          username: "",
        });
        setButtonSpinner(false);
        toast.show("Error logging In", { type: "danger" });
      });
  };

  return (
    <ScrollView>
      <View className="flex flex-col justify-center mt-[30px] p-5 ">
        <Text
          style={{ fontFamily: "Nunito_700Bold" }}
          className="text-3xl mx-auto mt-[50px]"
        >
          Welcome back{" "}
        </Text>
        <Text
          style={{ fontFamily: "Nunito_700Bold" }}
          className="mt-[50px] text-2xl"
        >
          Sigin in to your account
        </Text>
        <Text
          className="text-slate-500"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          Enter your details to continue
        </Text>
        <View className=" relative mt-3">
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3 mt-5 ">
            <Fontisto name="person" size={24} color="#747474" />
            <TextInput
              keyboardType={"email-address"}
              value={userInfo.username}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, username: value })
              }
              placeholder="Enter username"
              className="w-[80%] "
            />
          </View>
          <View className="flex flex-row gap-2 border border-slate-300 rounded-md p-3  mt-5 ">
            <FontAwesome name="lock" size={24} color="black" />
            <TextInput
              keyboardType={"default"}
              value={userInfo.password}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, password: value })
              }
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
        </View>
        <TouchableOpacity
          onPress={() => router.push("/forgotPassword")}
          className="flex items-end mt-3"
        >
          <Text>forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-red-500 items-center mt-10 p-3 rounded-md"
        >
          {buttonSpinner ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            <Text
              style={{ fontFamily: "Raleway_700Bold" }}
              className="text-white text-xl "
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex flex-row mt-5 items-center justify-center ">
          <Text className="mr-2">First time here ?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text
              className="text-blue-800"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
