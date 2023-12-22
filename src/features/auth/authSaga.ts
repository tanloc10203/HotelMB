import { getMessageErrorAxios } from "@/helpers/error.helper";
import authApi from "@/services/api/auth.api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "./authSlice";
import { appActions } from "../app";

function* logoutSaga() {
  try {
    yield call(authApi.logout);
    yield put(authActions.logoutSuccessful());
    yield put(
      appActions.setSnackbar({ open: true, text: "Bạn đã đăng xuất thành công", type: "success" })
    );
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(authActions.logoutFailed(message));
  }
}

function* watchLogoutSaga() {
  yield takeLatest(authActions.logout.type, logoutSaga);
}

function* authSaga() {
  yield all([watchLogoutSaga()]);
}

export default authSaga;
