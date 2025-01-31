import {
  all, fork, takeLatest, put
} from "redux-saga/effects";
import {
  setErrorForgotPassword, setErrorLogin, setErrorRegister, setErrorResetPassword,
  startRequestForgotPasswordFail, startRequestForgotPasswordSuccess, startRequestGetMeFail,
  startRequestLoginFail, startRequestLoginSuccess,
  startRequestRegisterFail,
  startRequestRegisterSuccess,
  startRequestResetPasswordFail, startRequestResetPasswordSuccess
} from "./index.js";
import {setAuthToken} from "../../../utils/localStorage";
import {getNotification} from "../../../utils/helper.js";
import _ from "lodash";
import {goToPage} from "../app/index.js";

function* loadRouteData () {
  //
}

function* handleActions () {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(goToPage({
      path: "/"
    }))
  });

  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.data.status
    let errors = action.payload.data.message
    if (statusError === 400) {
      yield put(setErrorLogin({
        email: _.get(errors,'email[0]',''),
        password: _.get(errors,'password[0]','')
      }));
      getNotification('error', errors);
    } else if (statusError === 403) {
      getNotification('error', errors);
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(startRequestGetMeFail, function (action) {
    let status = action.payload.data.email
    if (status === 401) {
      getNotification('error', action.payload.data.message)
    }
  });

  yield takeLatest(startRequestForgotPasswordSuccess, function* () {
    getNotification('success', 'Vui lòng kiểm tra email.');
    yield
  });

  yield takeLatest(startRequestForgotPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorForgotPassword({
        email: _.get(errors,'email',''),
      }));
    } else if (statusError === 401) {
      getNotification('error', 'Thông tin email không chính xác.');
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });

  yield takeLatest(startRequestResetPasswordSuccess, function* () {
    getNotification('success', 'Đặt lại mật khẩu thành công.');
    yield put(goToPage({
      path: "/"
    }))
  });

  yield takeLatest(startRequestResetPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.errors
      yield put(setErrorResetPassword({
        password: _.get(errors,'password[0]',''),
        confirmPassword: _.get(errors,'password_confirmation[0]',''),
      }));
    } else if (statusError === 401) {
      const message = action.payload.data.message;
      getNotification('error', (message ? message : 'Thông tin mật khẩu không hợp lệ.'));
    } else {
      getNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
  yield takeLatest(startRequestRegisterSuccess, function* (action) {
    getNotification('success', 'Đăng ký tài khoản thành công');
    let token = action.payload.data.access_token;
    setAuthToken(token);
    yield put(goToPage({
      path: "/"
    }))
  });

  yield takeLatest(startRequestRegisterFail, function* (action) {
    let errors = action.payload.data.detail
    if (errors) {
      yield put(setErrorRegister(errors));
    } else {
      getNotification('error', action.payload.data.message);
    }
  });
}

export default function* loadAuthSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
