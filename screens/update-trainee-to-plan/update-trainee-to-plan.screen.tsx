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
  const [mealPlan, setMealPlan] = useState<any>(null); // To hold existing meal plan details
  const { recipe_id } = useLocalSearchParams();
  const [mealPlanId, setMealPlanId] = useState(null);

  console.log("<---what----->", mealPlan);

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

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (recipe_id && users.length > 0) {
        try {
          const recipeIdString = Array.isArray(recipe_id)
            ? recipe_id[0]
            : recipe_id;
          const parsedRecipe = JSON.parse(recipeIdString);
          setDate(new Date(parsedRecipe.date_picked));
          setTime(new Date(parsedRecipe.time_picked));
          console.log(parsedRecipe.meal_users);
          setSelectedUsers(
            users.filter((user) => parsedRecipe.meal_users.includes(user.id))
          );
          setMealPlanId(parsedRecipe.meal_id);
          setMealPlan(parsedRecipe);
        } catch (error) {
          console.error("Error parsing recipe:", error);
          Toast.show("Failed to parse recipe data");
        }
      }
    };

    fetchMealPlan();
  }, [recipe_id, users]);

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

    const mealPlanData = {
      recipe: mealPlan.id,
      date_picked: date,
      time_picked: time,
      meal_users: userIds,
    };

    try {
      if (mealPlan) {
        // Update existing plan
        await axios.put(
          `${SERVER_URL}/api/v1/mealplans/${mealPlanId}`,
          mealPlanData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        Toast.show("Meal plan updated", { type: "success" });
      } else {
        // Create new plan
        await axios.post(`${SERVER_URL}/api/v1/mealplans`, mealPlanData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        Toast.show("Meal plan created", { type: "success" });
      }
      router.push("/(tabs)");
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
          <Text className="text-xl font-semibold">
            {mealPlan ? "Update Meal Plan" : "Complete Meal Plan"}
          </Text>
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
          <Text className="font-semibold">Add Trainee</Text>
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
                <Text style={styles.listItem}>{item.username}</Text>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <AntDesign name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text className="text-center text-slate-500">
                No users selected
              </Text>
            )}
            style={styles.userList}
          />
        </View>
        <TouchableOpacity
          onPress={handlePlan}
          style={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-semibold">Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  userItem: {
    padding: 10,
  },
  searchResults: {
    maxHeight: 200,
  },
  userList: {
    maxHeight: 100,
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
});
