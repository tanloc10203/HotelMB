import Container from "@/components/shared/Container";
import { ColorSchemas } from "@/constants/colors";
import { SocketEventsName } from "@/constants/socket";
import { useAuth } from "@/features/auth";
import { useRoom } from "@/features/room/roomSelector";
import { roomActions } from "@/features/room/roomSlice";
import { taxActions } from "@/features/tax/taxSlice";
import { socket } from "@/services/socket";
import { useAppDispatch } from "@/stores/hooks";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import SectionsHome from "./components/SectionsHome";
import { appActions } from "@/features/app";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { filters } = useRoom();
  const { userId } = useAuth();
  const [count, setCount] = useState<number>(0);

  const handleOnPressNotification = useCallback(() => {
    navigation.navigate("Notifications");
  }, []);

  const handleOnPressInformationHotel = useCallback(() => {
    navigation.navigate("InformationHotel");
  }, []);

  useEffect(() => {
    dispatch(appActions.setLoading(true));
    dispatch(roomActions.getDataStart({ page: 1, limit: 9999 }));
  }, [filters]);

  useEffect(() => {
    dispatch(taxActions.getDataStart({ page: 1, limit: 5, name_like: "VAT" }));
    dispatch(appActions.getBannerStart());
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      socket.connect();

      socket.emit(SocketEventsName.REQUEST_COUNT_NOTIFICATION, { userId });

      socket.on(SocketEventsName.GET_COUNT_NOTIFICATION, (countInput) => {
        setCount(Number(countInput));
      });

      return () => {
        socket.off("connect_error");
      };
    }, [userId])
  );

  useEffect(() => {
    if (!userId) return;
    socket.connect();

    let _count = 0;

    socket.on(SocketEventsName.NOTIFICATION, (data) => {
      _count += 1;
      socket.emit(SocketEventsName.REQUEST_COUNT_NOTIFICATION, { userId });
      setCount((prev) => prev + _count);
    });
  }, [userId]);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="ECool Hotel" />
        <Appbar.Action
          animated={false}
          onPress={handleOnPressNotification}
          icon={() => (
            <View style={{ position: "relative", flexDirection: "row" }}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={count >= 1 ? ColorSchemas.blue : ColorSchemas.black}
              />
              {count >= 1 ? (
                <View style={{}}>
                  <Text style={{ color: ColorSchemas.blue }}>{count}</Text>
                </View>
              ) : null}
            </View>
          )}
        />
        <Appbar.Action
          onPress={handleOnPressInformationHotel}
          animated={false}
          icon={() => <AntDesign name="infocirlceo" size={24} color={ColorSchemas.black} />}
        />
      </Appbar.Header>

      <SectionsHome />
    </Container>
  );
};

export default HomeScreen;
