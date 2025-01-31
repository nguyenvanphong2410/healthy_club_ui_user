import { createSlice } from '@reduxjs/toolkit';
import { initDataFilterCourse, initPaginationListCourse } from './initState';

const myCourseSlice = createSlice({
  name: 'myCourse',
  initialState: {
    // Done
    isLoadingMyCoursesDone: false,
    myCoursesDone: [],
    dataFilterMyCoursesDone: initDataFilterCourse,
    paginationListCoursesDone: initPaginationListCourse,

    // InProgress
    isLoadingMyCoursesInProgress: false,
    myCoursesInProgress: [],
    dataFilterMyCoursesInProgress: initDataFilterCourse,
    paginationListCoursesInProgress: initPaginationListCourse,

    // Pending
    isLoadingMyCoursesPending: false,
    myCoursesPending: [],
    dataFilterMyCoursesPending: initDataFilterCourse,
    paginationListCoursesPending: initPaginationListCourse,

    //Xem chi tiết lớp học của khóa
    visibleModalClassOfCourseOfUser: false,
    classOfCourseOfUserSelected: {},
    dataClassOfCourseOfUser: null,

  },
  reducers: {
    // Done
    setDataFilterMyCoursesDone: (state, action) => ({
      ...state,
      dataFilterMyCoursesDone: action.payload,
    }),
    getListMyCoursesDone: (state) => ({
      ...state,
      isLoadingMyCoursesDone: true,
    }),
    getListMyCoursesDoneSuccess: (state, action) => ({
      ...state,
      isLoadingMyCoursesDone: false,
      myCoursesDone: action.payload.data.courses,
      paginationListCoursesDone: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListMyCoursesDoneFailure: (state) => ({
      ...state,
      isLoadingMyCoursesDone: false,
      myCoursesDone: [],
    }),

    // InProgress
    setDataFilterMyCoursesInProgress: (state, action) => ({
      ...state,
      dataFilterMyCoursesInProgress: action.payload,
    }),
    getListInProgress: (state) => ({
      ...state,
      isLoadingInProgress: true,
    }),
    getListInProgressSuccess: (state, action) => ({
      ...state,
      isLoadingInProgress: false,
      myCoursesInProgress: action.payload.data.courses,
      paginationListCoursesInProgress: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListInProgressFailure: (state) => ({
      ...state,
      isLoadingInProgress: false,
      myCoursesDone: [],
    }),

    // Pending
    setDataFilterMyCoursesPending: (state, action) => ({
      ...state,
      dataFilterMyCoursesPending: action.payload,
    }),
    getListPending: (state) => ({
      ...state,
      isLoadingPending: true,
    }),
    getListPendingSuccess: (state, action) => ({
      ...state,
      isLoadingPending: false,
      myCoursesPending: action.payload.data.courses,
      paginationListCoursesPending: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListPendingFailure: (state) => ({
      ...state,
      isLoadingPending: false,
      myCoursesDone: [],
    }),

    //Xem chi tiết lớp học của khóa
    setVisibleModalClassOfCourseOfUser: (state, action) => ({
      ...state,
      visibleModalClassOfCourseOfUser: action.payload,
    }),

    setClassOfCourseOfUserSelected: (state, action) => ({
      ...state,
      classOfCourseOfUserSelected: action.payload,
    }),

    getClassOfCourseOfUser: (state) => ({
      ...state,
      isLoadingClassOfCourseOfUser: true,
    }),
    getClassOfCourseOfUserSuccess: (state, action) => ({
      ...state,
      isLoadingClassOfCourseOfUser: false,
      dataClassOfCourseOfUser: action.payload.data.data,
    }),
    getClassOfCourseOfUserFailure: (state) => ({
      ...state,
      isLoadingClassOfCourseOfUser: false,
      dataClassOfCourseOfUser: null,
    }),
  },
});

export const {
  // Done
  setDataFilterMyCoursesDone,
  getListMyCoursesDone,
  getListMyCoursesDoneSuccess,
  getListMyCoursesDoneFailure,

  // InProgress
  setDataFilterMyCoursesInProgress,
  getListInProgress,
  getListInProgressSuccess,
  getListInProgressFailure,

  // Pending
  setDataFilterMyCoursesPending,
  getListPending,
  getListPendingSuccess,
  getListPendingFailure,

  //Xem chi tiết lớp học của khóa
  setVisibleModalClassOfCourseOfUser,
  setClassOfCourseOfUserSelected,
  
  getClassOfCourseOfUser,
  getClassOfCourseOfUserSuccess,
  getClassOfCourseOfUserFailure
} = myCourseSlice.actions;

export default myCourseSlice.reducer;
