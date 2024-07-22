import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadImage } from "@/lib/cloudinary";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateRecipeScreen() {
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [mealPlanInfo, setMealPlanInfo] = useState({
    imageUrl: "",
    name: "",
    description: "",
    procedures: "",
  });
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  const handleAddInput = () => {
    if (inputValue.trim() !== "") {
      const updatedList = inputList
        ? `${inputList}, ${inputValue}`
        : inputValue;
      setInputList(updatedList);
      setInputValue("");
    }
  };

  const handleDelete = (item: string) => {
    const inputArray = inputList.split(", ").filter((tab) => tab !== item);
    setInputList(inputArray.join(", "));
  };

  ///Handle Image Upload
  const pickImage = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(results);
    if (!results.canceled) {
      setImage(results.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    //Starting creating state
    setIsLoading(true);

    /////Get access token
    const token = await AsyncStorage.getItem("access_token");
    ///Upload image to cloudinary
    const response = await uploadImage(image);
    // Update image

    let recipeDetails = {
      name: mealPlanInfo.name,
      thumbNail: response.public_id,
      ingredients: inputList,
      description: mealPlanInfo.description,
      procedures: mealPlanInfo.procedures,
      rating: 0,
    };
    console.log("<----Meal plan body--->", recipeDetails);

    ////Save to db
    await axios
      .post(`${SERVER_URL}/api/v1/recipe`, recipeDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        router.back();
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  if (!fontLoaded && !fontError) return null;

  return (
    <SafeAreaView>
      <LinearGradient className="flex-1" colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-[30px] mx-5">
            {/* header section */}
            <View className="flex flex-row items-center justify-between mb-5">
              <Feather
                style={{}}
                onPress={() => router.back()}
                name="corner-up-left"
                size={24}
                color="black"
              />
              <Text
                className="text-2xl font-semibold"
                style={{ fontFamily: "Nunito_700Bold" }}
              >
                Create recipe
              </Text>
              <Text></Text>
            </View>
            {/* End of header section */}
            {/* Thumbnail */}

            <Text className="mb-3">Add thumbnail image</Text>
            {image ? (
              <TouchableOpacity
                onPress={pickImage}
                className="w-full rounded-md  h-[100px] flex "
              >
                {image && (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: image }}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage} className="gap-2">
                <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center">
                  <AntDesign name="clouduploado" size={35} color="black" />
                </View>
              </TouchableOpacity>
            )}

            {/* End of thumbnail */}
            <View className="gap-2 mt-3">
              <Text>Enter recipe name</Text>
              <View className="border-2 border-slate-300 w-full rounded-md  p-3 h-[50px] flex items-center justify-center">
                <TextInput
                  onChangeText={(value) =>
                    setMealPlanInfo({ ...mealPlanInfo, name: value })
                  }
                  value={mealPlanInfo.name}
                  className="w-full h-full "
                />
              </View>
            </View>
            {/* End of meal name */}
            <View className="gap-2 mt-3">
              <Text>Nutritional Information</Text>
              <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] p-2  flex items-center justify-center">
                <TextInput
                  style={{ textAlignVertical: "top" }}
                  value={mealPlanInfo.description}
                  editable
                  multiline
                  numberOfLines={4}
                  className="w-[100%] h-[100%]"
                  onChangeText={(value) =>
                    setMealPlanInfo({ ...mealPlanInfo, description: value })
                  }
                />
              </View>
            </View>
            {/* End of descitpion */}
            <View className="gap-2 mt-3">
              <Text>Add recipe ingredients</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter ingredients"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
                <Button title="Add" onPress={handleAddInput} />
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={inputList ? inputList.split(", ") : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="border flex flex-row items-center justify-between border-slate-300 p-2 rounded-md ml-1 w-[100px] flex-wrap">
                    <Text style={styles.listItemText}>{item}</Text>
                    <AntDesign
                      name="close"
                      size={15}
                      color="black"
                      onPress={() => handleDelete(item)}
                    />
                  </View>
                )}
              />
            </View>
            {/* Procedures*/}
            <View className="gap-2 mt-3">
              <Text>Procedures</Text>
              <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center p-2">
                <TextInput
                  style={{ textAlignVertical: "top" }}
                  value={mealPlanInfo.procedures}
                  editable={true}
                  multiline
                  numberOfLines={6}
                  className="w-[100%] h-[100%]"
                  onChangeText={(value) =>
                    setMealPlanInfo({ ...mealPlanInfo, procedures: value })
                  }
                />
              </View>
            </View>
            {/* End of procedures*/}
            {/* Next button */}

            <TouchableOpacity
              onPress={handleCreate}
              className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md "
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-white text-xl  "
                >
                  Complete recipe
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  listItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 16,
  },
});
