import { useAuth } from "@/features/auth";
import { pushNotificationsActions } from "@/features/pushNotifications/pushNotificationsSlice";
import usePushNotifications from "@/hooks/usePushNotifications";
import { socket } from "@/services/socket";
import { useAppDispatch } from "@/stores/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Navigation: React.FC = () => {
  const { accessToken, userId } = useAuth();
  const { expoPushToken } = usePushNotifications();
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (!expoPushToken) return;
      socket.connect();

      dispatch(pushNotificationsActions.setExpoPushToken(expoPushToken.data));

      socket.auth = {
        userId: userId,
      };

      return () => {
        socket.off("connect_error");
      };
    }, [expoPushToken, userId])
  );

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      socket.connect();

      socket.auth = {
        userId,
      };

      return () => {
        socket.off("connect_error");
      };
    }, [userId])
  );

  return accessToken ? <MainStack /> : <AuthStack />;
};

export default Navigation;
