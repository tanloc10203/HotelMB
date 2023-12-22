import { appReducer } from "@/features/app";
import { AuthSliceState, authReducer } from "@/features/auth";
import { bookingReducer } from "@/features/booking";
import { notificationReducer } from "@/features/notification";
import pushNotificationsReducer from "@/features/pushNotifications/pushNotificationsSlice";
import roomReducer from "@/features/room/roomSlice";
import taxReducer from "@/features/tax/taxSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";

const authPersistConfig: PersistConfig<AuthSliceState> = {
  key: "auth",
  storage: AsyncStorage,
  blacklist: ["sendOtp", "error", "loading"],
  timeout: 0,
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  booking: bookingReducer,
  room: roomReducer,
  tax: taxReducer,
  pushNotifications: pushNotificationsReducer,
  notification: notificationReducer,
});

export default rootReducer;
