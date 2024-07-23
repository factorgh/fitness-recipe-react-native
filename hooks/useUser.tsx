import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data
  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const user_token = await AsyncStorage.getItem("access_token");
      const response = await axios.get(`${SERVER_URL}/api/v1/users/single`, {
        headers: {
          Authorization: `${user_token}`,
        },
      });
      console.log("<------accesTokenBeforeGetMe------>", user_token);
      console.log("<---------getMeData-------->", response.data.user);
      setUser(response.data.user);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, [fetchUser]);

  // Manually refetch user data
  const refetchUser = async () => {
    await fetchUser();
  };

  return { user, isLoading, refetchUser };
}
