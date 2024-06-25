import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    const getMe = async () => {
      const user_token = await AsyncStorage.getItem("access_token");
      await axios
        .get(`${SERVER_URL}/api/v1/user/single`, {
          headers: {
            Authorization: JSON.parse(user_token!),
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
    };
    getMe();
  }, []);

  return { user };
}
