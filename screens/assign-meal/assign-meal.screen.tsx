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
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";

export default function AddMealPlan() {
  useDisableSwipeBack();
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");

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
      setInputList([...inputList, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (item: any) => {
    const newFilter = inputList.filter((tab) => tab !== item);
    setInputList(newFilter);
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

  const handleNext = () => {
    let recipeDetails = {
      name: mealPlanInfo.name,
      imageUrl: image,
      ingredients: inputList,
      description: mealPlanInfo.description,
      procedures: mealPlanInfo.procedures,
    };
    console.log("<----Meal plan body--->", recipeDetails);
    router.back();
  };

  if (!fontLoaded && !fontError) return null;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-[60px] mx-5">
          {/* header section */}
          <View className="flex flex-row items-center justify-between mb-5">
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text
              className="text-xl font-semibold"
              style={{ fontFamily: "Nunito_700Bold" }}
            >
              Assign meal
            </Text>
            <Text>1/2</Text>
          </View>
          {/* End of header section */}
          {/* Thumbnail */}

          <Text>Add thumbnail image</Text>
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
              data={inputList}
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
              complete plan
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
