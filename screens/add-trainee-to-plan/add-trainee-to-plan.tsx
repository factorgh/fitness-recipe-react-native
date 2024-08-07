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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import useDisableSwipeBack from "@/hooks/useDisableSwipeBack";
import { User } from "@/types/User";

// Utility function
const setToMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export default function AddTraineeToPlanScreen() {
  useDisableSwipeBack();
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

  useEffect(() => {
    const loadUsers = async () => {
      const token = await AsyncStorage.getItem("access_token");
      try {
        const res = await axios.get(`${SERVER_URL}/api/v1/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        setUsers(res.data.users);
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
        const filtered = users.filter(
          (user) =>
            user.role === 0 &&
            user.username.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers([]);
      }
    },
    [users]
  );

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (!prevSelectedUsers.some((u) => u.id === user.id)) {
        return [...prevSelectedUsers, user];
      }
      return prevSelectedUsers;
    });
    setSearchInput("");
    setFilteredUsers([]);
  }, []);

  const handleDelete = useCallback((item: User) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.id !== item.id)
    );
  }, []);

  const handlePlan = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("access_token");
    const userIds = selectedUsers.map((user) => user.id);

    const mealPlan = {
      recipe: recipeDetails,
      date_picked: date,
      time_picked: time,
      users: userIds,
    };

    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/mealplans`, mealPlan, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      router.push("/(tabs)");
      Toast.show("Meal plan created ", { type: "success" });
    } catch (err: any) {
      Toast.show(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeDate = useCallback(
    (event: any, selectedDate: Date | undefined) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setDate(setToMidnight(selectedDate));
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
          {filteredUsers.length > 0 && (
            <View className="border border-slate-300 ps-2">
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectUser(item)}>
                    <Text style={styles.userItem}>{item.username}</Text>
                  </TouchableOpacity>
                )}
                style={styles.searchResults}
              />
            </View>
          )}
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
