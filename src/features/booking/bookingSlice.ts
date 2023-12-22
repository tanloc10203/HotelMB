import { IRoomResponse, SearchRoomAvailable } from "@/models/room.model";
import {
  BookingForPayload,
  BookingInfoCustomerPayload,
  BookingModel,
  BookingPayload,
} from "@/models/booking.model";
import { Loading, PaymentsType } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookingDetailModel } from "@/models/bookingDetails.model";

interface InitialState {
  adults: number;
  children: number;
  roomQuantity: number;
  roomBooking: IRoomResponse | null;
  bookingInfo: BookingInfoCustomerPayload | null;
  bookingFor: BookingForPayload | null;
  checkIn: string;
  checkOut: string;
  payment: PaymentsType;
  roomAvailable: number;
  loading: Loading;
  error: string;
  bookingId: string;

  screenBookings: {
    data: BookingModel[];
    isLoading: Loading;
    error: string;

    dataBookingDetails: BookingDetailModel[];
  };
}

const initialState: InitialState = {
  adults: 1,
  loading: "ready",
  children: 0,
  roomQuantity: 1,
  roomAvailable: 0,
  roomBooking: null,
  bookingInfo: null,
  bookingFor: null,
  checkIn: "",
  checkOut: "",
  payment: "online",
  error: "",

  bookingId: "",

  screenBookings: {
    data: [],
    dataBookingDetails: [],

    isLoading: "ready",
    error: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingId: (state, { payload }: PayloadAction<string>) => {
      state.bookingId = payload;
    },
    setAdults: (state, { payload }: PayloadAction<number>) => {
      state.adults = payload;
    },
    setChildren: (state, { payload }: PayloadAction<number>) => {
      state.children = payload;
    },
    setRoomQuantity: (state, { payload }: PayloadAction<number>) => {
      state.roomQuantity = payload;
    },
    setRoomBooking: (state, { payload }: PayloadAction<IRoomResponse>) => {
      state.roomBooking = payload;
    },
    setBookingInfo: (state, { payload }: PayloadAction<BookingInfoCustomerPayload>) => {
      state.bookingInfo = payload;
    },
    setBookingFor: (state, { payload }: PayloadAction<BookingForPayload>) => {
      state.bookingFor = payload;
    },
    setBookingCalendar: (
      state,
      {
        payload,
      }: PayloadAction<{
        adults: number;
        children: number;
        checkIn: string;
        checkOut: string;
      }>
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
    setPayment: (state, { payload }: PayloadAction<PaymentsType>) => {
      state.payment = payload;
    },

    getRoomAvailableStart: (state, _: PayloadAction<SearchRoomAvailable>) => {
      if (state.error) state.error = "";
      if (state.roomAvailable > 0) state.roomAvailable = 0;
      state.loading = "pending";
    },
    getRoomAvailableSuccessful: (state, { payload }: PayloadAction<number>) => {
      state.loading = "complete";
      state.roomAvailable = payload;
    },
    getRoomAvailableFailed: (state, { payload }: PayloadAction<string>) => {
      state.loading = "failed";
      state.error = payload;
    },
    resetBooking: (state) => {
      return initialState;
    },

    bookingStart: (state, {}: PayloadAction<BookingPayload>) => {
      if (state.error) state.error = "";
      state.loading = "pending";
    },

    bookingSuccess: (state, { payload }: PayloadAction<string>) => {
      state.loading = "complete";
      state.bookingId = payload;
    },

    paymentBookingStart: (state, _: PayloadAction<string>) => {
      if (state.error) state.error = "";
      state.loading = "pending";
    },

    paymentBookingSuccess: (state) => {
      state.loading = "complete";
    },

    bookingFailed: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = "failed";
    },

    getBookingScreenStart: (state, _: PayloadAction<string>) => {
      if (state.error) state.screenBookings.error = "";
      state.screenBookings.isLoading = "pending";
    },

    getBookingScreenSuccess: (state, { payload }: PayloadAction<BookingModel[]>) => {
      state.screenBookings.isLoading = "complete";
      state.screenBookings.data = payload;
    },

    getBookingScreenFailed: (state, { payload }: PayloadAction<string>) => {
      state.screenBookings.isLoading = "failed";
      state.screenBookings.error = payload;
    },

    getBookingDetailsStart: (state, _: PayloadAction<string>) => {
      if (state.error) state.screenBookings.error = "";
      state.screenBookings.isLoading = "pending";
    },

    getBookingDetailsSuccess: (state, { payload }: PayloadAction<BookingDetailModel[]>) => {
      state.screenBookings.isLoading = "complete";
      state.screenBookings.dataBookingDetails = payload;
    },

    resetLoading: (state) => {
      state.screenBookings.isLoading = "ready";
      state.screenBookings.dataBookingDetails = [];
      state.screenBookings.data = [];
    },

    cancelStart: (state, _: PayloadAction<string>) => {
      state.loading = "pending";
      state.error = "";
    },
    cancelSuccess: (state) => {
      state.loading = "complete";
      state.error = "";
      state.bookingId = "";
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
