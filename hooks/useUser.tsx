import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const getMe = async () => {
      setIsLoading(true);
      const user_token = await AsyncStorage.getItem("access_token");
      await axios
        .get(`${SERVER_URL}/api/v1/users/single`, {
          headers: {
            Authorization: `${user_token}`,
          },
        })
        .then((res) => {
          console.log("<------accesTokenBeforeGetMe------>", user_token);
          console.log("<---------getMeData-------->", res.data.user);
          setUser(res.data.user);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);

          setIsLoading(false);
        });
    };
    getMe();
  }, []);

  return { user, isLoading };
}
