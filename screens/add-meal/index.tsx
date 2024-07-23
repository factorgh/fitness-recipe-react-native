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
  KeyboardAvoidingView,
  Platform,
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
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function AddMealScreen() {
  useDisableSwipeBack();
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState<string[]>([]);
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
    if (inputValue.trim() !== "" && !inputList.includes(inputValue)) {
      setInputList((prevList) => [...prevList, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (item: string) => {
    setInputList((prevList) => prevList.filter((i) => i !== item));
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
      ingredients: inputList.join(", "),
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
        console.log(res.data.recipe.id);
        const recipe_id = res.data.recipe.id;
        router.push({
          pathname: "/(routes)/add-trainee-to-plan",
          params: { recipe_id: JSON.stringify(recipe_id) },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  if (!fontLoaded && !fontError) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              {/* header section */}
              <View style={styles.headerSection}>
                <Feather
                  onPress={() => router.back()}
                  name="corner-up-left"
                  size={24}
                  color="black"
                />
                <Text style={styles.headerText}>Add recipe</Text>
                <Text></Text>
              </View>
              {/* End of header section */}
              {/* Thumbnail */}
              <Text style={styles.label}>Add thumbnail image</Text>
              {image ? (
                <TouchableOpacity onPress={pickImage} style={styles.thumbnail}>
                  {image && (
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: image }}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.addThumbnail}
                >
                  <View style={styles.uploadIconContainer}>
                    <AntDesign name="clouduploado" size={35} color="black" />
                  </View>
                </TouchableOpacity>
              )}
              {/* End of thumbnail */}
              <View style={styles.inputContainer}>
                <Text>Enter recipe name</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    onChangeText={(value) =>
                      setMealPlanInfo({ ...mealPlanInfo, name: value })
                    }
                    value={mealPlanInfo.name}
                    style={styles.textInput}
                  />
                </View>
              </View>
              {/* End of meal name */}
              <View style={styles.inputContainer}>
                <Text>Nutritional Information</Text>
                <View style={styles.textArea}>
                  <TextInput
                    style={styles.textAreaInput}
                    value={mealPlanInfo.description}
                    editable
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) =>
                      setMealPlanInfo({ ...mealPlanInfo, description: value })
                    }
                  />
                </View>
              </View>
              {/* End of description */}
              <View style={styles.inputContainer}>
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
                  data={inputList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.listItemContainer}>
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
              <View style={styles.inputContainer}>
                <Text>Process</Text>
                <View style={styles.textArea}>
                  <TextInput
                    style={styles.textAreaInput}
                    value={mealPlanInfo.procedures}
                    editable
                    multiline
                    numberOfLines={6}
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
                style={styles.nextButton}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : (
                  <Text style={styles.nextButtonText}>Proceed with plan</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Nunito_700Bold",
  },
  label: {
    marginBottom: 10,
  },
  thumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  addThumbnail: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  textInput: {
    width: "100%",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  textAreaInput: {
    width: "100%",
    height: "100%",
    textAlignVertical: "top",
  },
  form: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  listItemText: {
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
});
