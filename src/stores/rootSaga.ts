import appSaga from "@/features/app/appSaga";
import authSaga from "@/features/auth/authSaga";
import bookingSaga from "@/features/booking/bookingSaga";
import notificationSaga from "@/features/notification/notificationSaga";
import roomSaga from "@/features/room/roomSaga";
import taxSaga from "@/features/tax/taxSaga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([appSaga(), authSaga(), roomSaga(), bookingSaga(), taxSaga(), notificationSaga()]);
}

export default rootSaga;
