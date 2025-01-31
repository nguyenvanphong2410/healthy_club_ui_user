import { all, fork, put } from 'redux-saga/effects';

import _ from 'lodash';
import { requestGetMyCalendar } from '@/api/myCalendar';

function* loadRouteData() {
    yield put(requestGetMyCalendar());
}

function* handleActions() {}

export default function* loadMyCourseSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
