import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(function () {
    const getMe = async () => {
      const user_token = await AsyncStorage.getItem("access_token");
      await axios
        .get(`${SERVER_URL}/api/v1/users/single`, {
          headers: {
            Authorization: `${user_token}`,
          },
        })
        .then((res) => {
          console.log("<------accesTokenBeforeGetMe------>", user_token);
          console.log("<---------getMeData-------->", res.data);
          setUser(res.data);
        })
        .catch((err) => console.log(err.message));
    };
    getMe();
  }, []);

  return { user };
}
