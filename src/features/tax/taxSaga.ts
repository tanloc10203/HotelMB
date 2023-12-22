import { getMessageErrorAxios } from "@/helpers/error.helper";
import { ITax } from "@/models/tax.model";
import taxApi from "@/services/api/tax.api";
import { Filters, Pagination, SuccessResponseProp } from "@/types/common";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { taxActions } from "./taxSlice";

type ResponseData = SuccessResponseProp<ITax[], Pagination>;

function* getData({ payload }: PayloadAction<Filters>) {
  try {
    yield call(taxApi.useLastPrefix);
    const response: ResponseData = yield call(taxApi.get, payload);
    yield put(taxActions.getDataSuccess(response));
  } catch (error: any) {
    let message = getMessageErrorAxios(error);
    yield put(taxActions.getDataFailed(message));
  }
}

function* watchGetData() {
  yield takeLatest(taxActions.getDataStart.type, getData);
}

function* taxSaga() {
  yield all([watchGetData()]);
}

export default taxSaga;
