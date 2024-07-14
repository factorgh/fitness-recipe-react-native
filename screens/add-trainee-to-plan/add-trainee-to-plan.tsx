import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from 'expo-file-system';
import { s3Bucket } from "@/utils/S3.config";



interface User {
  id: string;
  name: string;
}
export default function AddTraineeToPlanScreen() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [inputList, setInputList] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { recipe } = useLocalSearchParams();


  let recipeDetails = null;
  if (typeof recipe === 'string') {
    try {
      recipeDetails = JSON.parse(recipe);
      console.log("<-----thumnail------>",recipeDetails.thumbNail)
    } catch (error) {
      console.error('Error parsing recipe:', error);
    }
  } else {
    console.error('Recipe is not a valid string:', recipe);
  }
  console.log("<--------recipe forwared--------->", recipe);

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
  /////Fetch suggestions on input change

  useEffect(() => {
    if (inputValue.length > 2) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const fetchSuggestions = async (query: any) => {
    await axios
      .get(`${SERVER_URL}/api/v1/users/filter?name=${query}`)
      .then((res) => {
        setSuggestions(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleSelectSuggestion = (user: any) => {
    setSelectedUsers([...selectedUsers, user]);
    setInputValue("");
    setSuggestions([]);
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    ////Parse the iso string in to a  date object
    const formattedDate = new Date(currentDate);

    ///Get actual Date
    const actualDate = setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };
/////Handling of base 64 transformation to blob before upload

  async function readBase64File(file: string): Promise<string> {
    const base64Data = await FileSystem.readAsStringAsync(file, { encoding: FileSystem.EncodingType.Base64 });
    return cleanBase64(base64Data);
}

function cleanBase64(base64Data: string): string {
    // Remove any non-base64 characters, such as newlines or spaces
    base64Data = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');

    // Add padding if necessary
    const pad = base64Data.length % 4;
    if (pad) {
        base64Data += new Array(5 - pad).join('=');
    }

    return base64Data;
}
// actual changing to blob
function base64ToUint8Array(base64Data: string): Uint8Array {
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}



// Publish image to aws bucket 
const handlePublishToAWS = async(file: string)=>{
  try{
         // Verify if the file exists
         const fileInfo = await FileSystem.getInfoAsync(file);
         if (!fileInfo.exists) {
           console.error('File does not exist: ', file);
           Alert.alert('File Error', 'File does not exist');
           return;
         }
         
   
  ///get extention 
  const fileExt = file.split(".").pop(); ///ex. .png , .jpe

 // Read the file as a base64 string
 const base64Data = await FileSystem.readAsStringAsync(file, { encoding: FileSystem.EncodingType.Base64 });


  const params = {
    Bucket: "fitness-recipe-app",
    Key:`fitnes-recipe-${Date.now()}.${fileExt}`,
    Body: base64ToUint8Array(base64Data), //////Convert file to a base64 format
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg', 
    ACL: "public-read",
    
  }


  s3Bucket.upload(params, (err: any, data: { Location: any; }) => {
    if (err) {
      console.error('Error uploading to S3: ', err);
      Alert.alert('Upload Failed', 'Failed to upload image to S3');
    } else {
      console.log('Successfully uploaded to S3: ', data.Location);
      Alert.alert('Upload Successful', 'Image uploaded successfully');
    }
  });
} catch (error) {
  console.error('Error reading file: ', error);
  Alert.alert('File Read Failed', 'Failed to read the file');
}
}

  const handleCompletePlan = () => {
    let mealPlan = {
      recipe: recipe,
      createdOn: date,
      createdAt: time,

      user: inputList,
    };
    console.log("<---------mealPlanItem-Completed------->", mealPlan);
    handlePublishToAWS(recipeDetails.thumbNail)
  };

  return (
    <SafeAreaView>
    <ScrollView>
      <View className="mt-[60px] mx-5">
        <View className=" flex flex-row justify-between mb-5  ">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">complete meal plan</Text>
          <Text>2/2</Text>
        </View>
        {/* End of header section */}
        {/* Date picker section */}
        <Text className="font-semibold">Add Date</Text>
        <View className="border border-slate-300 rounded-md flex flex-row justify-between p-2 ">
          <TextInput value={date.toLocaleDateString()} placeholder="dd/mm/yy" />
          <MaterialIcons
            onPress={() => setShowDatePicker(true)}
            name="date-range"
            size={24}
            color="black"
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* End of date picker section */}

        <Text className="mt-5 font-semibold">Add Time</Text>
        <View className="border border-slate-300 rounded-md flex flex-row justify-between p-2 ">
          <TextInput
            value={time.toLocaleTimeString()}
            placeholder="choose a specifc time"
          />
          <MaterialIcons
            onPress={() => setShowTimePicker(true)}
            name="access-time"
            size={24}
            color="black"
          />
        </View>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        {/* End of time picker section */}

        {/* Add trainee section */}
        <View className="gap-2 mt-3">
          <Text className="font-semibold">Add trainee</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Search trainee by name or add new"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Button title="Add" onPress={handleAddInput} />
          </View>
          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectSuggestion(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
        <TouchableOpacity
          onPress={handleCompletePlan}
          className="bg-red-500 items-center mt-[40px] mb-3 p-3 rounded-md "
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
  suggestionsContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
  },
});
