import { NotificationModel } from "@/models/notification.model";
import { Filters, Loading, Pagination, SuccessResponseProp } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: NotificationModel[];
  isLoading: Loading;
  error: string;

  filters: Filters;
  pagination: Pagination;
}

const initialState: InitialState = {
  data: [],
  isLoading: "ready",
  error: "",
  filters: {
    limit: 10,
    page: 1,
  },
  pagination: {
    limit: 10,
    page: 1,
    totalPage: 2,
    totalRows: 20,
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotificationStart: (state, _: PayloadAction<Filters>) => {
      if (state.error) state.error = "";
      state.isLoading = "pending";
    },

    getNotificationSuccess: (
      state,
      { payload }: PayloadAction<SuccessResponseProp<NotificationModel[], Pagination>>
    ) => {
      state.isLoading = "complete";
      state.error = "";
      state.data = [...payload.metadata];
      state.pagination = payload.options!;
    },

    setData: (state, { payload }: PayloadAction<NotificationModel[]>) => {
      state.data = [...payload];
    },

    reSetData: (state) => {
      state.data = [];
    },

    getNotificationFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.error = payload;
    },

    updateIsReadStart: (state, _: PayloadAction<string>) => {
      if (state.error) state.error = "";
      state.isLoading = "pending";
    },

    updateIsReadSuccess: (state) => {
      state.isLoading = "complete";
      state.error = "";
    },

    setFilter: (state, { payload }: PayloadAction<Filters>) => {
      state.filters = {
        ...payload,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
