import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import { useToast } from "react-native-toast-notifications";

export default function RoleScreen() {
  const [activeButton, setActiveButton] = useState(null);
  const [checkBoxState1, setCheckBoxState1] = useState(false);
  const [checkBoxState2, setCheckBoxState2] = useState(false);
  const [role, setRole] = useState(0);

  const toast = useToast();
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });
  if (!fontLoaded && !fontError) return null;

  const handleRoleSelect = (button: any) => {
    setActiveButton(button);
    if (button === "button1") {
      setCheckBoxState1(true);
      setCheckBoxState2(false);
      setRole(1);
    } else if (button === "button2") {
      setCheckBoxState2(true);
      setCheckBoxState1(false);
      setRole(0);
    }

    console.log(button);
  };

  const selectedRole = `flex-1  border-2 border-red-600 shadow-md p-3 rounded-md h-[200px] border-`;
  const unSelectedRole = `flex-1  border border-slate-400 shadow-sm p-3 rounded-md h-[200px]`;

  const handleProceed = async () => {
    ///Get user token from the local storage and append it to
    try {
      console.log(role);
      const token = await AsyncStorage.getItem("access_token");
      console.log("<-------accessToken-------->", token);
      const response = await axios
        .put(
          `${SERVER_URL}/api/v1/users/single`,
          { role: role },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          router.push("/(tabs)");
        })
        .catch((err) => toast.show("Invalid Role", { type: "danger" }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1  mt-[40px] p-3 ">
      <View className="p-3 mb-5">
        <Text
          style={{ fontFamily: "Nunito_400Regular" }}
          className="text-3xl font-semibold "
        >
          Select your role
        </Text>
        <Text
          style={{ fontFamily: "Nunito_400Regular" }}
          className="text-slate-500 mt-2"
        >
          Identify yourself :Trainer or Trainee
        </Text>
        <View className="border border-red-700 rounded-md h-[0px] mt-6"></View>
      </View>

      {/* Role section */}

      <View className="flex flex-row gap-5 mt-8 ">
        <TouchableOpacity
          onPress={() => handleRoleSelect("button1")}
          className={activeButton === "button1" ? selectedRole : unSelectedRole}
        >
          <BouncyCheckbox
            size={25}
            fillColor="red"
            isChecked={checkBoxState1}
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
          />
          <View className="w-full h-[120px]">
            <Image
              style={{ width: 150, height: 100 }}
              className="rounded-md mt-5"
              resizeMode="cover"
              source={require("@/assets/images/role2.png")}
            />
          </View>
          <Text style={{ fontFamily: "Nunito_400Regular", marginTop: 5 }}>
            Trainer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRoleSelect("button2")}
          className={activeButton === "button2" ? selectedRole : unSelectedRole}
        >
          <BouncyCheckbox
            size={25}
            fillColor="red"
            isChecked={checkBoxState2}
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
          />
          <View className="w-full h-[120px]">
            <Image
              style={{ width: 150, height: 100 }}
              className="rounded-md mt-5"
              resizeMode="cover"
              source={require("@/assets/images/role1.png")}
            />
          </View>

          <Text style={{ fontFamily: "Nunito_400Regular", marginTop: 5 }}>
            Trainee
          </Text>
        </TouchableOpacity>
      </View>
      {/* End of role section */}
      {activeButton ? (
        <TouchableOpacity
          onPress={handleProceed}
          className="bg-red-500 items-center mt-[250px] mb-3 p-3 rounded-md "
        >
          <Text
            style={{ fontFamily: "Raleway_700Bold" }}
            className="text-white text-xl  "
          >
            Proceed
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleProceed}
          className="bg-red-200 items-center mt-[250px] mb-3 p-3 rounded-md"
        >
          <Text
            style={{ fontFamily: "Raleway_700Bold" }}
            className="text-white text-xl  "
          >
            Proceed
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
