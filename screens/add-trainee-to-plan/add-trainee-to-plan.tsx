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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Toast } from "react-native-toast-notifications";

// Uitlity function
const setToMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export default function AddTraineeToPlanScreen() {
  const [inputList, setInputList] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { recipe_id } = useLocalSearchParams();

  const recipeDetails = useMemo(() => {
    if (typeof recipe_id === "string") {
      try {
        console.log("<---recipe_id----->", JSON.parse(recipe_id));
        return JSON.parse(recipe_id);
      } catch (error) {
        console.error("Error parsin recipe:", error);
        return null;
      }
    } else {
      Toast.show("Recipe not available");
      return null;
    }
  }, [recipe_id]);

  console.log("<--recipeDetails2-->", recipeDetails);
  useEffect(() => {
    const loadUsers = async () => {
      const token = await AsyncStorage.getItem("access_token");
      console.log("<------tokenForUsers", token);
      try {
        const res = await axios.get(`${SERVER_URL}/api/v1/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    loadUsers();
  }, []);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchInput(text);
      if (text) {
        const filtered = users.filter((user) =>
          user.username.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers(users);
      }
    },
    [users]
  );

  const handleSelectUser = useCallback(
    (user: User) => {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
      setSearchInput("");
      setFilteredUsers(users);
    },
    [users]
  );

  const handleDelete = useCallback((item: User) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.id !== item.id)
    );
  }, []);

  const handlePlan = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("access_token");
    const userIds = selectedUsers.map((user) => user.id);
    console.log("<----IDS--->", userIds);

    const mealPlan = {
      recipe: recipeDetails,
      date_picked: date,
      time_picked: time,
      users: userIds,
    };
    console.log("<---mealplan----->", mealPlan);

    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/mealplans`, mealPlan, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      console.log(res.data);
      router.push("/(tabs)");
      Toast.show("Meal plan created ");
      setIsLoading(false);
    } catch (err: any) {
      Toast.show(err.message);
      console.log(err);
      setIsLoading(false);
    }
  };

  const onChangeDate = useCallback(
    (event: any, selectedDate: Date | undefined) => {
      setShowDatePicker(false);
      if (selectedDate) {
        const midnightDate = setToMidnight(selectedDate);
        setDate(midnightDate);
      }
    },
    []
  );

  const onChangeTime = useCallback(
    (event: any, selectedTime: Date | undefined) => {
      setShowTimePicker(false);
      if (selectedTime) {
        setTime(selectedTime);
      }
    },
    []
  );

  return (
    <SafeAreaView>
      <View className="mt-[60px] mx-5">
        <View className="flex flex-row justify-between mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">complete meal plan</Text>
          <Text>2/2</Text>
        </View>
        <Text className="font-semibold">Add Date</Text>
        <View className="border border-slate-300 rounded-md flex flex-row justify-between p-2">
          <TextInput
            value={date.toLocaleDateString()}
            placeholder="dd/mm/yy"
            editable={false}
          />
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
        <Text className="mt-5 font-semibold">Add Time</Text>
        <View className="border border-slate-300 rounded-md flex flex-row justify-between p-2">
          <TextInput
            value={time.toLocaleTimeString()}
            placeholder="choose a specific time"
            editable={false}
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
            keyExtractor={(item) => item.id.toString()}
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
            onPress={handlePlan}
            className="bg-red-500 items-center mt-5 mb-3 p-3 rounded-md"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={{ fontFamily: "Nunito_700Bold" }}
                className="text-white text-xl"
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
