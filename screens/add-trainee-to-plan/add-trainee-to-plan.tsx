import {
  ActivityIndicator,
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
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImage } from "@/lib/cloudinary";
import { Toast } from "react-native-toast-notifications";
// import * as FileSystem from "expo-file-system";
// import { s3Bucket } from "@/utils/S3.config";

export default function AddTraineeToPlanScreen() {
  const [inputList, setInputList] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // New state
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { recipe } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  let recipeDetails = null;
  if (typeof recipe === "string") {
    try {
      recipeDetails = JSON.parse(recipe);
      console.log("<-----thumnail------>", recipeDetails.img_url);
    } catch (error) {
      console.error("Error parsing recipe:", error);
    }
  } else {
    console.error("Recipe is not a valid string:", recipe);
  }
  console.log("<--------recipe forwared--------->", recipe);

  // Handle Delete
  const handleDelete = (item: any) => {
    const newFilter = filteredUsers.filter((tab) => tab !== item);
    setSelectedUsers(newFilter);
  };
  /////Fetch suggestions on input change

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

  ///LOGIC FOR FETCH AND SEARCH OF TRAINEES
  useEffect(() => {
    const loadUsers = async () => {
      // Get token to allow for permission to fetch trainees
      const token = await AsyncStorage.getItem("access_token");
      console.log("<------tokenForUsers", token);
      await axios
        .get(`${SERVER_URL}/api/v1/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log("<----------all users ------------>", res.data);
          setUsers(res.data.users);
        })
        .catch((err) => console.log(err)); // Initialize filteredUsers with all users
    };
    loadUsers();
  }, []);

  // Handle Search Users
  const handleSearch = (text: any) => {
    console.log(text);
    setSearchInput(text);
    if (text) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Reset to all users if search input is empty
    }
  };

  // Handle Select Users
  const handleSelectUser = (user: User) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    setSearchInput("");
    setFilteredUsers(users); // Reset to all users after selection
  };

  // Handle complete meal plan
  const handleCompletePlan = async () => {
    setIsLoading(true);

    // Before upload ,get image url before sending to db
    const response = await uploadImage(recipeDetails.img_url);
    console.log(response.public_id);

    // Extract user IDs from selectedUsers array
    const userIDs = selectedUsers.map((user) => user.id);
    let mealPlan = {
      recipe: { ...recipeDetails, img_url: response.public_id },
      date_picked: date,
      time_picked: time,

      user: userIDs,
    };
    console.log("<---------mealPlanItem-Completed------->", mealPlan);

    /////Get access token
    const token = await AsyncStorage.getItem("access_token");
    // console.log("<-------tokenBeforeMealPlan-------------->", access_token);

    ////Send meal plan to backend
    await axios
      .post(`${SERVER_URL}/api/v1/mealplans`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Toast.show("Meal plan created!!!");
        //// Redirect the user to home page
        router.push("/(tabs)/mealplans");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Toast.show("An error occured");
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView>
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
              value={searchInput}
              onChangeText={handleSearch}
            />
          </View>
          <View className="border border-slate-300 ps-2">
            {filteredUsers.length > 0 && (
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectUser(item)}>
                    <Text style={styles.userItem}>{item.username}</Text>
                  </TouchableOpacity>
                )}
                style={styles.searchResults}
              />
            )}
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={selectedUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: User }) => (
              <View className="border flex flex-row items-center justify-between border-slate-300 p-2 rounded-md ml-1 w-[100px] flex-wrap">
                <Text style={styles.listItemText}>{item.username}</Text>
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
        <View>
          <TouchableOpacity
            onPress={handleCompletePlan}
            className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md "
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-white text-xl  "
              >
                Complete plan
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
  searchResults: {
    maxHeight: 150, // Adjust as needed
  },
  userItem: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  selectedUsersContainer: {
    marginTop: 20,
  },
  selectedUserItem: {
    padding: 5,
  },
});
