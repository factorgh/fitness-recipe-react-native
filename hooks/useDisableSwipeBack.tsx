import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useDisableSwipeBack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        gestureEnabled: false,
      });
    }
  }, [navigation]);
};

export default useDisableSwipeBack;
