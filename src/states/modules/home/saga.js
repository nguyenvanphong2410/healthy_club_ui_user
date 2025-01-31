import {
  all, fork,
  put,
  takeLatest
} from "redux-saga/effects";
import { requestGetListOverviewsFail, requestGetListRevenueFail, requestGetListTransactionFail } from "./index.js";
import { getNotification } from "@/utils/helper.js";
import { handleGetListDataCourses } from "@/api/course/index.js";
import { setOrderCurrent } from "../order/index.js";
import { requestConfig } from "@/api/config/index.js";
import { requestGetAllTeachers } from "@/api/teacher/index.js";

function* loadRouteData() {
  yield put(handleGetListDataCourses());
  yield put(requestGetAllTeachers());
  yield put(requestConfig());
  yield put(setOrderCurrent(0));

}

function* handleActions() {
  yield takeLatest(requestGetListOverviewsFail, function (action) {
    let statusError = action.payload.status
    if (statusError) {
      const message = action.payload.data.message;
      getNotification('error', message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestGetListRevenueFail, function (action) {
    let statusError = action.payload.status
    if (statusError) {
      const message = action.payload.data.message;
      getNotification('error', message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(requestGetListTransactionFail, function (action) {
    let statusError = action.payload.status
    if (statusError) {
      const message = action.payload.data.message;
      getNotification('error', message);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
