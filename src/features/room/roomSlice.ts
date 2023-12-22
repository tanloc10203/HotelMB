import { RateState } from "@/models/rate.model";
import { IRoomResponse } from "@/models/room.model";
import { Filters, Loading, Pagination, SuccessResponseProp } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: IRoomResponse[];
  dataSingle: IRoomResponse | null;
  isLoading: Loading;
  errors: {
    addEdit: string;
    get: string;
  };
  filters: Filters;
  pagination: Pagination;

  rates: RateState[];
  visible: boolean;
}

const initialState: InitialState = {
  data: [],
  dataSingle: null,
  isLoading: "ready",
  errors: {
    addEdit: "",
    get: "",
  },
  filters: {
    limit: 5,
    page: 1,
  },
  pagination: {
    limit: 5,
    page: 1,
    totalPage: 2,
    totalRows: 10,
  },

  rates: [],
  visible: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.visible = payload;
    },
    getDataStart: (state, _: PayloadAction<Filters>) => {
      if (state.errors.addEdit) state.errors.addEdit = "";
      if (state.errors.get) state.errors.get = "";
      state.isLoading = "pending";
    },

    getDataSuccess: (
      state,
      {
        payload: { metadata, options },
      }: PayloadAction<SuccessResponseProp<IRoomResponse[], Pagination>>
    ) => {
      state.data = metadata;
      state.isLoading = "complete";
      state.pagination = options!;
    },

    getDataFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.errors.get = payload;
    },

    getDataSingleStart: (state, _: PayloadAction<number>) => {
      if (state.errors.get) state.errors.get = "";
      if (state.dataSingle) state.dataSingle = null;
      state.isLoading = "pending";
    },

    getDataSingleSuccess: (state, { payload }: PayloadAction<IRoomResponse | null>) => {
      state.isLoading = "complete";
      state.dataSingle = payload;
    },

    setFilter: (state, { payload }: PayloadAction<Filters>) => {
      state.filters = {
        ...payload,
      };
    },

    setDebounceSearch: (_state, _actions: PayloadAction<Filters>) => {},

    addRateStart: (state, _: PayloadAction<RateState>) => {
      state.errors.addEdit = "";
    },

    addRateSuccess: (state) => {
      state.errors.addEdit = "";
      state.visible = false;
    },

    getRateStart: (state, _: PayloadAction<number>) => {
      state.isLoading = "pending";
      state.errors.addEdit = "";
    },

    getRateSuccess: (state, { payload }: PayloadAction<RateState[]>) => {
      state.isLoading = "complete";
      state.errors.addEdit = "";
      state.rates = payload;
    },
  },
});

const { actions, reducer: roomReducer } = roomSlice;
export const roomActions = actions;
export default roomReducer;
