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
} from "react-native";
import React, { useState } from "react";

import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { Recipe } from "@/types/Recipe";
import { Alert } from "react-native";

export default function AddMealPlan() {
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState("");
  const [image, setImage] = useState<string | null>(null);

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
      const destUri = `${FileSystem.cacheDirectory}image.jpg`;
      console.log("Source URI: ", sourceUri);
      console.log("Destination URI: ", destUri);

      try {
        // Copy the image to the cache directory
        await FileSystem.copyAsync({
          from: sourceUri,
          to: destUri,
        });

        setImage(destUri);
      } catch (error) {
        console.error("Error saving image: ", error);
        Alert.alert("Save Error", "Failed to save image");
      }
    }
  };

  const handleNext = () => {
    // Check for all input availability(Defensive mechanism)
    // if (!mealPlanInfo.name || !mealPlanInfo.imageUrl) return;

    let recipeDetails = {
      name: mealPlanInfo.name,
      img_url: image,
      ingredients: inputList,
      description: mealPlanInfo.description,
      procedures: mealPlanInfo.procedures,
    };
    console.log("<----Meal plan body--->", recipeDetails);
    router.push({
      pathname: "/(routes)/add-trainee-to-plan",
      params: { recipe: JSON.stringify(recipeDetails) },
    });
  };

  if (!fontLoaded && !fontError) return null;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-[30px] mx-5">
          {/* header section */}
          <View className="flex flex-row items-center justify-between mb-5">
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text
              className="text-xl font-semibold"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              Add a meal plan
            </Text>
            <Text>1/2</Text>
          </View>
          {/* End of header section */}
          {/* Thumbnail */}

          <Text className="mb-2">Add thumbnail image</Text>
          {image ? (
            <TouchableOpacity
              onPress={chooseImage}
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
            <TouchableOpacity onPress={chooseImage} className="gap-2">
              <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center">
                <AntDesign name="clouduploado" size={35} color="black" />
              </View>
            </TouchableOpacity>
          )}

          {/* End of thumbnail */}
          <View className="gap-2 mt-3">
            <Text>Enter meal name</Text>
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
            onPress={handleNext}
            className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md "
          >
            <Text
              style={{ fontFamily: "Nunito_700Bold" }}
              className="text-white text-xl  "
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
