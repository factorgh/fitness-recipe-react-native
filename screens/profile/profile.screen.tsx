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
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
// import { SERVER_URL } from "@/utils/utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Fontisto } from "@expo/vector-icons";

import { User } from "@/types/User";
import { cld, uploadImage } from "@/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import useUser from "@/hooks/useUser";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import useUser from "@/hooks/useUser";

export default function ProfileScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    phone: "",
    email: "",
  });
  const { user } = useUser();

  // const [value, setValue] = useState("");
  // const [filteredValue, setFilteredValue] = useState<User[]>([]);

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

    console.log(result);
    if (!result.canceled) {
      const sourceUri = result.assets[0].uri;
      console.log("<---------imagepath------------>", sourceUri);
      setImage(sourceUri);
    }
  };

  // Handle Image Upload
  const updateProfile = async () => {
    // Get token for updating
    const token = await AsyncStorage.getItem("access_token");

    // Upload Image to cloudinary
    const response = await uploadImage(image!);
    console.log(response.public_id);
    // Set to remote image
    setRemoteImage(response.public_id);
    // Create Update object
    const updateObject = {
      img_url: response.public_id,
      phone: userInfo.phone,
      email: userInfo.email,
    };
    // Save to DB
    await axios
      .put(`${SERVER_URL}/api/v1/users/single`, updateObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((res) => {});
  };

  let remoteCldImage;
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    remoteCldImage.resize(thumbnail().width(300).height(300));
  }

  console.log("<-----------------all users------------------>", users[0]);
  return (
    <SafeAreaView>
      <LinearGradient className="h-full" colors={["#E5ECF9", "#F6F7F9"]}>
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
            <View>
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
                  className="w-48 aspect-square self-center rounded-full "
                  cldImg={remoteCldImage!}
                />
              ) : (
                <View
                  className="bg-slate-300"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    position: "absolute",
                    top: 130,
                    left: 150,
                  }}
                ></View>
              )}
            </View>
          </ImageBackground>
          {/* user details section */}
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
          {/* Change profile pic section */}
          <TouchableOpacity onPress={chooseImage}>
            <Text
              style={{ fontFamily: "Nunito_400Regular" }}
              className="text-blue-500 mb-5 text-center items-center justify-center"
            >
              Change profile
            </Text>
          </TouchableOpacity>
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
            className="flex flex-col   items-center justify-between mx-3 mb-20 gap-2"
            style={{ marginLeft: 20 }}
          >
            <View className="bg-slate-200 shadow-sm w-full h-16 p-3  rounded-md  flex-row items-center ">
              <FontAwesome name="phone" size={24} color="gray" />
              <View style={{ marginLeft: 10, width: "80%" }}>
                <TextInput
                  defaultValue={user?.phone}
                  value={userInfo.phone}
                  placeholder="tel ..."
                  className="w-full border border-slate-300 p-2 rounded-l-md"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, phone: value });
                  }}
                />
              </View>
            </View>
            {/* Full name */}
            <View className="bg-slate-200 shadow-sm w-full h-16 p-3  rounded-md  flex-row items-center ">
              <Fontisto name="email" size={24} color="black" />
              <View style={{ marginLeft: 10, width: "80%" }}>
                <TextInput
                  value={userInfo.email}
                  defaultValue={user?.email}
                  placeholder="email ..."
                  className="w-full border border-slate-300 p-2 rounded-l-md"
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, email: value });
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={updateProfile}
            className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md mx-5"
          >
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className="text-white text-xl  "
            >
              Update Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
