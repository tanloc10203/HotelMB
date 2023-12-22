import { getMessageErrorAxios } from "@/helpers/error.helper";
import { NotificationModel } from "@/models/notification.model";
import notificationApi from "@/services/api/notification.api";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { notificationActions } from "./notificationSlice";
import { Filters, Pagination, SuccessResponseProp } from "@/types/common";

function* GetNotification({ payload }: PayloadAction<Filters>) {
  try {
    yield delay(350);
    const response: SuccessResponseProp<NotificationModel[], Pagination> = yield call(
      notificationApi.get,
      payload
    );
    yield put(notificationActions.getNotificationSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(notificationActions.getNotificationFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetNotification() {
  yield takeLatest(notificationActions.getNotificationStart.type, GetNotification);
}

function* UpdateIsRead({ payload }: PayloadAction<string>) {
  try {
    yield delay(350);
    yield call(notificationApi.patch, payload, {
      is_read: true,
    });
    yield put(notificationActions.updateIsReadSuccess());
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(notificationActions.getNotificationFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchUpdateIsRead() {
  yield takeLatest(notificationActions.updateIsReadStart.type, UpdateIsRead);
}

function* notificationSaga() {
  yield all([watchGetNotification(), watchUpdateIsRead()]);
}

export default notificationSaga;
