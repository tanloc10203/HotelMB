import { ITax } from "@/models/tax.model";
import { Filters, Loading, Pagination, SuccessResponseProp } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: ITax[];
  isLoading: Loading;
  errors: {
    addEdit: string;
    get: string;
  };
  filters: Filters;
  pagination: Pagination;
}

const initialState: InitialState = {
  data: [],
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
};

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    getDataStart: (state, _: PayloadAction<Filters>) => {
      if (state.errors.addEdit) state.errors.addEdit = "";
      if (state.errors.get) state.errors.get = "";
      state.isLoading = "pending";
    },

    getDataSuccess: (
      state,
      { payload: { metadata, options } }: PayloadAction<SuccessResponseProp<ITax[], Pagination>>
    ) => {
      state.data = metadata;
      state.isLoading = "complete";
      state.pagination = options!;
    },

    getDataFailed: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = "failed";
      state.errors.get = payload;
    },

    setFilter: (state, { payload }: PayloadAction<Filters>) => {
      state.filters = {
        ...payload,
      };
    },

    setDebounceSearch: (_state, _actions: PayloadAction<Filters>) => {},
  },
});

const { actions, reducer: taxReducer } = taxSlice;
export const taxActions = actions;
export default taxReducer;
