import { BannerState } from "@/models/banner.model";
import { InformationHotelState } from "@/models/informationHotel.model";
import { Loading, SnackbarStatusType } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackbarType = {
  open: boolean;
  duration: number;
  type: SnackbarStatusType;
  text: string;
};

type SnackbarPayload = {
  open: boolean;
  duration?: number;
  type: SnackbarStatusType;
  text: string;
};

type BannerRDState = {
  loading: Loading;
  data: BannerState[];
  error: string;
};

type HotelRDState = {
  loading: Loading;
  data: InformationHotelState[];
  error: string;
};

interface AppSliceState {
  loading: boolean;
  asyncStoreIsChange: boolean;
  snackbar: SnackbarType;
  banners: BannerRDState;
  hotels: HotelRDState;
}

const initialState: AppSliceState = {
  loading: false,
  asyncStoreIsChange: false,
  snackbar: {
    open: false,
    duration: 7000,
    text: "",
    type: "default",
  },

  banners: {
    loading: "ready",
    data: [],
    error: "",
  },

  hotels: {
    loading: "ready",
    data: [],
    error: "",
  },
};

export const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    asyncStoreChange: (state, { payload }: PayloadAction<boolean>) => {
      state.asyncStoreIsChange = payload;
    },
    setSnackbar: (state, { payload }: PayloadAction<SnackbarPayload>) => {
      state.snackbar = { ...state.snackbar, ...payload };
    },

    getBannerStart: (state) => {
      state.banners.loading = "pending";
      state.banners.error = "";
    },
    getBannerSuccess: (state, { payload }: PayloadAction<BannerState[]>) => {
      state.banners.loading = "complete";
      state.banners.error = "";
      state.banners.data = payload;
    },
    getBannerFailed: (state, { payload }: PayloadAction<string>) => {
      state.banners.loading = "pending";
      state.banners.error = payload;
    },

    getHotelStart: (state) => {
      state.hotels.loading = "pending";
      state.hotels.error = "";
    },
    getHotelSuccess: (state, { payload }: PayloadAction<InformationHotelState[]>) => {
      state.hotels.loading = "complete";
      state.hotels.error = "";
      state.hotels.data = payload;
    },
    getHotelFailed: (state, { payload }: PayloadAction<string>) => {
      state.hotels.loading = "pending";
      state.hotels.error = payload;
    },
  },
});

const appReducer = appSlice.reducer;

export const appActions = appSlice.actions;
export default appReducer;
