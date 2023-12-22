import { getMessageErrorAxios } from "@/helpers/error.helper";
import { BookingModel, BookingPayload } from "@/models/booking.model";
import { BookingDetailModel } from "@/models/bookingDetails.model";
import { UserState } from "@/models/customer.model";
import { SearchRoomAvailable } from "@/models/room.model";
import bookingApi from "@/services/api/booking.api";
import roomApi from "@/services/api/room.api";
import { navigate } from "@/services/navigation";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { appActions } from "../app";
import { bookingActions } from "./bookingSlice";

function* getRoomAvailable({ payload }: PayloadAction<SearchRoomAvailable>) {
  try {
    roomApi.prefix = "/Rooms/searchingAvailable";
    const response: number = yield call(roomApi.post, payload);
    yield put(bookingActions.getRoomAvailableSuccessful(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.getRoomAvailableFailed(message));
  }
}

function* watchGetRoomAvailable() {
  yield takeLatest(bookingActions.getRoomAvailableStart.type, getRoomAvailable);
}

function* bookingRoom({ payload }: PayloadAction<BookingPayload>) {
  try {
    const response: { url: string; bookingId: string } = yield call(bookingApi.post, payload);
    yield put(bookingActions.bookingSuccess(response.bookingId));
    yield call(navigate, "ZaloPayment", { url: response.url, bookingId: response.bookingId });
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.bookingFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchBookingRoom() {
  yield takeLatest(bookingActions.bookingStart.type, bookingRoom);
}

function* paymentBooking({ payload }: PayloadAction<string>) {
  try {
    const response: string = yield call(bookingApi.paymentBooking, payload);
    yield put(bookingActions.paymentBookingSuccess());
    yield call(navigate, "ZaloPayment", { url: response, bookingId: payload });
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.bookingFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchPaymentBooking() {
  yield takeLatest(bookingActions.paymentBookingStart.type, paymentBooking);
}

function* cancelBooking({ payload }: PayloadAction<string>) {
  try {
    yield call(bookingApi.cancel, payload);
    yield put(bookingActions.cancelSuccess());
    const state: { user: UserState | null } = yield select((state) => state.auth);

    if (!state?.user?.id) return;

    yield put(appActions.setLoading(true));
    yield put(bookingActions.getBookingScreenStart(String(state?.user?.id)));

    yield put(
      appActions.setSnackbar({ open: true, text: "Hủy phòng thành công", type: "success" })
    );
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.bookingFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchCancelBooking() {
  yield takeLatest(bookingActions.cancelStart.type, cancelBooking);
}

function* GetBookingScreen({ payload }: PayloadAction<string>) {
  try {
    yield delay(350);
    const response: BookingModel[] = yield call(bookingApi.getBookingByCustomer, payload);
    yield put(bookingActions.getBookingScreenSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.getBookingScreenFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetBookingScreen() {
  yield takeLatest(bookingActions.getBookingScreenStart.type, GetBookingScreen);
}

function* GetBookingDetails({ payload }: PayloadAction<string>) {
  try {
    yield delay(350);
    const response: BookingDetailModel[] = yield call(bookingApi.getBookingDetails, payload);
    yield put(bookingActions.getBookingDetailsSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(bookingActions.getBookingScreenFailed(message));
    yield put(appActions.setSnackbar({ open: true, text: message, type: "error" }));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchGetBookingDetails() {
  yield takeLatest(bookingActions.getBookingDetailsStart.type, GetBookingDetails);
}

function* bookingSaga() {
  yield all([
    watchGetRoomAvailable(),
    watchBookingRoom(),
    watchGetBookingScreen(),
    watchGetBookingDetails(),
    watchPaymentBooking(),
    watchCancelBooking(),
  ]);
}

export default bookingSaga;
