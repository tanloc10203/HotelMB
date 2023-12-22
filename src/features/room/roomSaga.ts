import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, debounce, put, takeLatest } from "redux-saga/effects";
import { getMessageErrorAxios } from "@/helpers/error.helper";
import { Filters, Pagination, SuccessResponseProp } from "@/types/common";
import { IRoomResponse } from "@/models/room.model";
import roomApi from "@/services/api/room.api";
import { roomActions } from "./roomSlice";
import { appActions } from "../app";
import rateApi from "@/services/api/rate.api";
import { RateState } from "@/models/rate.model";
import { ToastAndroid } from "react-native";
import { navigate } from "@/services/navigation";

type ResponseData = SuccessResponseProp<IRoomResponse[], Pagination>;

function* getData({ payload }: PayloadAction<Filters>) {
  try {
    yield call(roomApi.useLastPrefix);
    const response: ResponseData = yield call(roomApi.get, payload);
    yield put(roomActions.getDataSuccess(response));
  } catch (error: any) {
    let message = getMessageErrorAxios(error);
    yield put(roomActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetData() {
  yield takeLatest(roomActions.getDataStart.type, getData);
}

function* getSingleData({ payload }: PayloadAction<number>) {
  try {
    yield call(roomApi.useLastPrefix);
    const response: IRoomResponse | null = yield call(roomApi.getById, payload);
    yield put(roomActions.getDataSingleSuccess(response));
  } catch (error: any) {
    let message = getMessageErrorAxios(error);
    yield put(roomActions.getDataFailed(message));
  }
}

function* watchGetSingleData() {
  yield takeLatest(roomActions.getDataSingleStart.type, getSingleData);
}

function* GetRates({ payload }: PayloadAction<number>) {
  try {
    yield call(roomApi.useLastPrefix);
    const response: SuccessResponseProp<RateState[]> = yield call(rateApi.get, {
      room_id: payload,
      limit: 9999,
    });
    yield put(roomActions.getRateSuccess(response.metadata));
  } catch (error: any) {
    let message = getMessageErrorAxios(error);
    yield put(roomActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetRates() {
  yield takeLatest(roomActions.getRateStart.type, GetRates);
}

function* AddRates({ payload }: PayloadAction<RateState>) {
  try {
    yield call(roomApi.useLastPrefix);
    yield call(rateApi.post, payload);
    yield put(roomActions.getRateStart(payload.room_id));
    yield put(roomActions.addRateSuccess());
    ToastAndroid.showWithGravity("Đánh giá thành công", ToastAndroid.LONG, ToastAndroid.CENTER);
  } catch (error: any) {
    let message = getMessageErrorAxios(error);
    yield put(roomActions.getDataFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchAddRates() {
  yield takeLatest(roomActions.addRateStart.type, AddRates);
}

function* searchDebounce({ payload }: PayloadAction<Filters>) {
  yield put(roomActions.setFilter(payload));
}

function* watchDebounceSearch() {
  yield debounce(500, roomActions.setDebounceSearch.type, searchDebounce);
}

function* roomSaga() {
  yield all([
    watchGetData(),
    watchDebounceSearch(),
    watchGetSingleData(),
    watchGetRates(),
    watchAddRates(),
  ]);
}

export default roomSaga;
