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
import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { cld, uploadImage } from "@/lib/cloudinary";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import { Recipe } from "@/types/Recipe";
import { AdvancedImage } from "cloudinary-react-native";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function UpdateRecipeScreen() {
  useDisableSwipeBack();
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState<string>("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    description: "",
    procedures: "",
    thumbNail: "",
  });

  const { recipe_id } = useLocalSearchParams();

  const recipeId = useMemo(() => {
    if (typeof recipe_id === "string") {
      try {
        return JSON.parse(recipe_id);
      } catch (error) {
        console.error("Error parsing recipe:", error);
        return null;
      }
    } else {
      Toast.show("Recipe not available");
      return null;
    }
  }, [recipe_id]);

  console.log("<---recipeDetails----->", recipeId);
  let [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  // Get recipe based on ID

  // Handle meal plan generation
  useEffect(() => {
    async function getRecipe() {
      // Get token from storage
      const token = await AsyncStorage.getItem("access_token");

      // Fetch recipe with token based on recipe ID
      await axios
        .get(`${SERVER_URL}/api/v1/recipe/single/${recipeId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log("<--- single Recipe----->", res.data.recipe);
          setRecipeInfo({
            thumbNail: res.data.recipe.thumbNail,
            description: res.data.recipe.description,
            name: res.data.recipe.name,
            procedures: res.data.recipe.procedures,
          });
          setInputValue(res.data.recipe.ingredients);
        })
        .catch((err) => console.log(err));
    }

    getRecipe();
  }, [recipeId]);

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(results);
    if (!results.canceled) {
      setImage(results.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    //Starting creating state
    setIsLoading(true);

    /////Get access token
    const token = await AsyncStorage.getItem("access_token");
    console.log(token);

    // Initialize the imageUrl with the existing thumbnail
    let imageUrl = recipeInfo.thumbNail;

    // Check if a new image has been selected
    if (image && image !== recipeInfo.thumbNail) {
      try {
        const response = await uploadImage(image);
        imageUrl = response.public_id;
      } catch (error) {
        console.error("Error uploading image:", error);
        Toast.show("Error uploading image");
        setIsLoading(false);
        return;
      }
    }

    const recipeDetails = {
      name: recipeInfo.name,
      thumbNail: imageUrl,
      ingredients: inputList,
      description: recipeInfo.description,
      procedures: recipeInfo.procedures,
      rating: 0,
    };
    console.log("<----Meal plan body--->", recipeDetails);

    console.log(recipeId);
    ////Save to db
    await axios
      .put(`${SERVER_URL}/api/v1/recipe/single/${recipeId}`, recipeDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Toast.show("recipe updated", { type: "success" });

        router.push({
          pathname: "/(tabs)/mealplans",
        });

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.show("Error updating recipe");

        console.log(err);
      });
  };

  if (!fontLoaded && !fontError) return null;

  const thumbNailImage = cld.image(recipeInfo?.thumbNail);

  return (
    <SafeAreaView>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-[30px] mx-5">
            {/* header section */}
            <View className="flex flex-row items-center justify-between mb-5">
              <Feather
                onPress={() => router.back()}
                name="corner-up-left"
                size={24}
                color="black"
              />
              <Text
                className="text-2xl font-semibold"
                style={{ fontFamily: "Nunito_700Bold" }}
              >
                Update meal
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
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: image || "" }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage} className="gap-2">
                {thumbNailImage && (
                  <AdvancedImage
                    className="w-full h-[100px] rounded-md "
                    cldImg={thumbNailImage!}
                  />
                )}
              </TouchableOpacity>
            )}

            {/* End of thumbnail */}
            <View className="gap-2 mt-3">
              <Text>Enter recipe name</Text>
              <View className="border-2 border-slate-300 w-full rounded-md  p-3 h-[50px] flex items-center justify-center">
                <TextInput
                  onChangeText={(value) =>
                    setRecipeInfo({ ...recipeInfo, name: value })
                  }
                  value={recipeInfo.name}
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
                  value={recipeInfo.description}
                  editable
                  multiline
                  numberOfLines={4}
                  className="w-[100%] h-[100%]"
                  onChangeText={(value) =>
                    setRecipeInfo({ ...recipeInfo, description: value })
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
              <Text>Process</Text>
              <View className="border-2 border-slate-300 w-full rounded-md  h-[100px] flex items-center justify-center p-2">
                <TextInput
                  style={{ textAlignVertical: "top" }}
                  value={recipeInfo.procedures}
                  editable={true}
                  multiline
                  numberOfLines={6}
                  className="w-[100%] h-[100%]"
                  onChangeText={(value) =>
                    setRecipeInfo({ ...recipeInfo, procedures: value })
                  }
                />
              </View>
            </View>
            {/* End of procedures*/}
            {/* Next button */}

            <TouchableOpacity
              onPress={handleUpdate}
              className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md "
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                <Text
                  style={{ fontFamily: "Nunito_700Bold" }}
                  className="text-white text-xl  "
                >
                  Update recipe
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
