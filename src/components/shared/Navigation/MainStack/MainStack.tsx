import OverlayLoading from "@/components/ui/OverlayLoading";
import { PUSH_EXPO_TOKEN } from "@/constants/socket";
import { useSelectorPushNotifications } from "@/features/pushNotifications/pushNotificationsSelector";
import BookingCalendar from "@/screens/BookingCalendar";
import BookingDetailsScreen from "@/screens/BookingDetailsScreen";
import BookingInfoCustomer from "@/screens/BookingInfoCustomer";
import BookingInfoDetails from "@/screens/BookingInfoDetails";
import BookingResultsScreen from "@/screens/BookingResultsScreen";
import BookingSelect from "@/screens/BookingSelect";
import BookingSelectPayments from "@/screens/BookingSelectPayments";
import BookingSelectedRoomAvailableScreen from "@/screens/BookingSelectedRoomAvailableScreen";
import BookingSuccessfulScreen from "@/screens/BookingSuccessfulScreen";
import MainScreen from "@/screens/MainScreen";
import NotificationsScreen from "@/screens/NotificationsScreen";
import PaymentsScreen from "@/screens/PaymentsScreen";
import RoomDetailsScreen from "@/screens/RoomDetailsScreen";
import ZaloPaymentScreen from "@/screens/ZaloPaymentScreen";
import { socket } from "@/services/socket";
import { RootStackParamList } from "@/types/navigation";
import { LinkingOptions, PathConfigMap } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import { Text } from "react-native";
import useGetProfile from "./hook/useGetProfile";
import InformationHotelScreen from "@/screens/InformationHotelScreen/InformationHotelScreen";

const config: {
  initialRouteName?: keyof RootStackParamList | undefined;
  screens: PathConfigMap<RootStackParamList>;
} = {
  initialRouteName: "BookingSuccessful",
  screens: {
    BookingSuccessful: "success",
  },
};

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config,
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      console.log("====================================");
      console.log(`url`, url);
      console.log("====================================");
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
};

const Stack = createNativeStackNavigator();

const MainStack: React.FC = () => {
  const { data, error, isLoading, isValidating } = useGetProfile();
  const { expoPushToken } = useSelectorPushNotifications();

  useEffect(() => {
    if (!data || !expoPushToken) return;
    socket.connect();

    socket.emit(PUSH_EXPO_TOKEN, { userId: data.metadata.id, expoPushToken });
  }, [data, expoPushToken]);

  if (isLoading) return <OverlayLoading visible />;

  if (error) return <Text>Loading error</Text>;

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        component={MainScreen}
        name="Main"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={NotificationsScreen}
        name="Notifications"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={RoomDetailsScreen}
        name="RoomDetails"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingCalendar}
        name="BookingCalendar"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingInfoCustomer}
        name="BookingInfoCustomer"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelect}
        name="BookingSelect"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelectPayments}
        name="BookingSelectPayments"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingInfoDetails}
        name="BookingInfoDetails"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSuccessfulScreen}
        name="BookingSuccessful"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingResultsScreen}
        name="BookingResults"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelectedRoomAvailableScreen}
        name="BookingSelectedRoomAvailable"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={BookingDetailsScreen}
        name="BookingDetails"
        key={"success"}
        navigationKey="success"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={PaymentsScreen}
        name="Payments"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={ZaloPaymentScreen}
        name="ZaloPayment"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={InformationHotelScreen}
        name="InformationHotel"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
