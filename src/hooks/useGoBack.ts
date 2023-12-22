import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const useGoBack = () => {
  const navigation = useNavigation();

  const onGoBack = useCallback(() => navigation.goBack(), []);

  return { onGoBack };
};

export default useGoBack;
