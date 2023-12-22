import { getMessageErrorAxios } from "@/helpers/error.helper";
import { BannerState } from "@/models/banner.model";
import bannerApi from "@/services/api/banner.api";
import { SuccessResponseProp } from "@/types/common";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { appActions } from "./appSlice";
import informationHotelApi from "@/services/api/informationHotel.api";
import { InformationHotelState } from "@/models/informationHotel.model";

function* getBanners() {
  try {
    const response: SuccessResponseProp<BannerState[]> = yield call(bannerApi.get, { limit: 9999 });
    yield put(appActions.getBannerSuccess(response.metadata));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(appActions.getBannerFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetBanner() {
  yield takeLatest(appActions.getBannerStart.type, getBanners);
}

function* getHotel() {
  try {
    const response: SuccessResponseProp<InformationHotelState[]> = yield call(
      informationHotelApi.get,
      { limit: 9999 }
    );
    yield put(appActions.getHotelSuccess(response.metadata));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(appActions.getHotelFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetHotel() {
  yield takeLatest(appActions.getHotelStart.type, getHotel);
}

function* appSaga() {
  yield all([watchGetBanner(), watchGetHotel()]);
}

export default appSaga;
