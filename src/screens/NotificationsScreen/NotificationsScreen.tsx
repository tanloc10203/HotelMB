import Container from "@/components/shared/Container";
import { ColorSchemas } from "@/constants/colors";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { notificationActions, useNotification } from "@/features/notification";
import useGoBack from "@/hooks/useGoBack";
import { useAppDispatch } from "@/stores/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { Appbar } from "react-native-paper";
import ListNotifications from "./components/ListNotifications";
import { socket } from "@/services/socket";
import { NotificationModel } from "@/models/notification.model";
import { SocketEventsName } from "@/constants/socket";

type Props = {};

const NotificationsScreen: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { onGoBack } = useGoBack();
  const { userId } = useAuth();
  const { data, filters, pagination } = useNotification();

  useEffect(() => {
    socket.on(SocketEventsName.NOTIFICATION, (response: NotificationModel) => {
      dispatch(notificationActions.setData([...data, response]));
    });
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      // dispatch(appActions.setLoading(true));
      dispatch(
        notificationActions.getNotificationStart({
          ...filters,
          limit: 9999,
          page: 1,
          actor_type: "customer",
          user_id: userId,
          order: "created_at",
        })
      );
    }, [userId, filters])
  );

  return (
    <Container style={{ backgroundColor: ColorSchemas.greyLighter }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title="Thông báo" />
        <Appbar.Action
          animated={false}
          icon={() => (
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={24}
              color={ColorSchemas.black}
            />
          )}
        />
      </Appbar.Header>

      <ListNotifications />
    </Container>
  );
};

export default NotificationsScreen;
