
import { getClassOfCourseOfUser, getClassOfCourseOfUserFailure, getClassOfCourseOfUserSuccess, getListInProgress, getListInProgressFailure, getListInProgressSuccess, getListMyCoursesDone, getListMyCoursesDoneFailure, getListMyCoursesDoneSuccess, getListPending, getListPendingFailure, getListPendingSuccess } from "@/states/modules/myCourse";
import callApi from "../callApi";

export const requestGetMyCourseDone = () => async (dispatch, getState) => {
  const dataFilter = getState().myCourse.dataFilterMyCoursesDone;
  let path = `user/my-course/done?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [  getListMyCoursesDone,
      getListMyCoursesDoneSuccess,
      getListMyCoursesDoneFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetMyCourseInProgress = () => async (dispatch, getState) => {
  const dataFilter = getState().myCourse.dataFilterMyCoursesInProgress;
  let path = `user/my-course/in-progress?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [  getListInProgress,
      getListInProgressSuccess,
      getListInProgressFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetMyCoursePending = () => async (dispatch, getState) => {
  const dataFilter = getState().myCourse.dataFilterMyCoursesPending;
  let path = `user/my-course/pending?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [  getListPending,
      getListPendingSuccess,
      getListPendingFailure],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetClassOfCourseOfUser = (id) => async (dispatch, getState) => {
  let path = `user/my-course/${id}`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getClassOfCourseOfUser,
      getClassOfCourseOfUserSuccess,
      getClassOfCourseOfUserFailure
    ],
    variables: {},
    dispatch,
    getState,
  });
};

