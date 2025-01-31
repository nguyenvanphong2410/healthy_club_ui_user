import { all, fork } from 'redux-saga/effects';

import _ from 'lodash';

function* loadRouteData() {}

function* handleActions() {}

export default function* loadMyCourseSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}
