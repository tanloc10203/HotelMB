import { UserState } from "@/models/customer.model";
import { Loading } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Status = "verify" | "verified" | null;

export type AuthSliceState = {
  status: Status;
  phoneNumber: string | null;
  sendOtp: boolean;
  user: UserState | null;
  apiKey: string | null;
  userId: string | number | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string;
  loading: Loading;
};

const initialState: AuthSliceState = {
  status: null,
  userId: null,
  apiKey: null,
  phoneNumber: null,
  sendOtp: false,
  accessToken: null,
  user: null,
  refreshToken: null,
  error: "",
  loading: "ready",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (
      state,
      {
        payload: { apiKey, userId },
      }: PayloadAction<{ userId: number | null; apiKey: string | null }>
    ) => {
      state.apiKey = apiKey;
      state.userId = userId;
    },

    setStatus: (state, { payload }: PayloadAction<Status>) => {
      state.status = payload;
    },

    setPhoneNumber: (state, { payload }: PayloadAction<string>) => {
      state.phoneNumber = payload;
    },

    setSendOtp: (state, { payload }: PayloadAction<boolean>) => {
      state.sendOtp = payload;
    },

    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
    },

    setUser: (state, { payload }: PayloadAction<UserState | null>) => {
      state.user = payload;
    },

    setRefreshToken: (state, { payload }: PayloadAction<string | null>) => {
      state.refreshToken = payload;
    },

    logout: (state) => {
      state.loading = "pending";
      if (state.error) state.error = "";
    },

    logoutSuccessful: (state) => {
      state.loading = "complete";
      if (state.error) state.error = "";
      state.refreshToken = null;
      state.accessToken = null;
      state.apiKey = null;
      state.userId = null;
      state.user = null;
    },

    logoutFailed: (state, { payload }: PayloadAction<string>) => {
      state.loading = "failed";
      state.error = payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
