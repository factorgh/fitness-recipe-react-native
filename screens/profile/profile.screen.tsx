import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { User } from "@/types/User";
import { cld, uploadImage } from "@/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import useUser from "@/hooks/useUser";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import Loader from "@/components/loader";
import Animated, { FadeInUp } from "react-native-reanimated";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export default function ProfileScreen() {
  useDisableSwipeBack();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { user, refetchUser } = useUser(); // Destructure refetchUser

  const [userInfo, setUserInfo] = useState({
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({ phone: user.phone || "", email: user.email || "" });
    }
  }, [user]);

  // Select image section
  const chooseImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const sourceUri = result.assets[0].uri;
      setImage(sourceUri);
    }
  };

  // Handle Image Upload
  const updateProfile = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("access_token");

    let img_url = user?.img_url; // Existing image URL

    // Check if there is an image to upload
    if (image) {
      try {
        const response = await uploadImage(image);
        img_url = response.public_id; // Set to the new image URL
      } catch (err) {
        setIsLoading(false);
        Toast.show("Error uploading image", { type: "danger" });
        return;
      }
    }

    const updateObject = {
      img_url,
      phone: userInfo.phone,
      email: userInfo.email,
    };

    try {
      await axios.put(`${SERVER_URL}/api/v1/users/single`, updateObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setIsLoading(false);
      Toast.show("Profile updated successfully", { type: "success" });
      refetchUser(); // Refetch user data to update across the app
    } catch (err) {
      setIsLoading(false);
      Toast.show("Error updating profile", { type: "danger" });
    }
  };

  let remoteCldImage;
  if (user?.img_url) {
    remoteCldImage = cld
      .image(user.img_url)
      .resize(thumbnail().width(300).height(300));
  }

  return (
    <SafeAreaView>
      <LinearGradient className="h-full" colors={["#E5ECF9", "#F6F7F9"]}>
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
            <Animated.View entering={FadeInUp.duration(50).springify()}>
              {image ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    position: "absolute",
                    top: 130,
                    left: 150,
                  }}
                  source={{ uri: image }}
                />
              ) : remoteCldImage ? (
                <AdvancedImage
                  className="w-32 aspect-square self-center rounded-full absolute top-24 "
                  cldImg={remoteCldImage!}
                />
              ) : (
                <View
                  className="bg-slate-300"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    position: "absolute",
                    top: 130,
                    left: 150,
                  }}
                ></View>
              )}
            </Animated.View>
          </ImageBackground>
          <View className="flex-col items-center mt-16 mb-5">
            <Text
              className="text-slate-500"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              {user?.name}
            </Text>
            <Text
              className="text-slate-500"
              style={{ fontFamily: "Nunito_400Regular" }}
            >
              {user?.email}
            </Text>
          </View>
          <TouchableOpacity onPress={chooseImage}>
            <Text
              style={{ fontFamily: "Nunito_400Regular" }}
              className="text-blue-500 mb-5 text-center items-center justify-center"
            >
              Change profile
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: "black",
              opacity: 0.1,
              marginBottom: 10,
            }}
          ></View>
          <Text
            className="text-slate-900 text-lg ml-5 mb-3 mt-10"
            style={{ fontFamily: "Nunito_700Bold" }}
          >
            Information
          </Text>
          <View className="flex flex-col items-center justify-between space-x-2 mb-20 gap-2">
            <View className="bg-slate-200 shadow-sm w-full h-16 mx-2 rounded-md flex-row items-center justify-center">
              <TextInput
                style={{ marginHorizontal: 10, width: "90%" }}
                value={userInfo.phone}
                placeholder="mobile ..."
                className="w-full border border-slate-300 p-2 rounded-md"
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, phone: value });
                }}
              />
            </View>
            <View className="bg-slate-200 shadow-sm w-full h-16 mx-2 rounded-md flex-row items-center justify-center">
              <TextInput
                style={{ marginHorizontal: 10, width: "90%" }}
                value={userInfo.email}
                placeholder="email ..."
                className="w-full border border-slate-300 p-2 rounded-md"
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, email: value });
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={updateProfile}
            className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md mx-3"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-white text-xl"
              >
                Update profile
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
