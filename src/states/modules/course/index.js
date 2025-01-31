import { createSlice } from '@reduxjs/toolkit';
import { initDataFilterCourse, initErrInfoCourse, initInfoCourse, initPaginationListCourse } from './initState';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    isLoadingCardCourses: false,
    isLoadingBtnCreateOrUpdate: false,
    isLoadingBtnDelete: false,
    visibleModalCreateOrUpdateCourse: false,
    visibleModalDeleteCourse: false,

    courses: [],
    allCourse: [],
    giftCourse: null,
    classRegisterOfCourse: '',

    infoCourses: initInfoCourse,
    errorInfoCourses: initErrInfoCourse,

    dataFilter: initDataFilterCourse,
    paginationListCourse: initPaginationListCourse,
    configModalCourse: {
      title: '',
      type: '',
    },
  },
  reducers: {
    getListDataCourse: (state) => ({
      ...state,
      isLoadingCardCourses: true,
    }),
    getListDataCourseSuccess: (state, action) => ({
      ...state,
      isLoadingCardCourses: false,
      courses: action.payload.data.courses,
      paginationListCourse: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListDataCourseFailure: (state) => ({
      ...state,
      isLoadingCardCourses: false,
      courses: [],
    }),
    createCourse: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: true,
    }),
    createCourseSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false,
    }),
    createCourseFailure: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false,
    }),
    updateCourse: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: true,
    }),
    updateCourseSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false,
    }),
    updateCourseFailure: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdate: false,
    }),
    deleteCourse: (state) => ({
      ...state,
      isLoadingBtnDelete: true,
    }),
    deleteCourseSuccess: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
    }),
    deleteCourseFailure: (state) => ({
      ...state,
      isLoadingBtnDelete: false,
    }),
    setShowModalCreateOrUpdateCourse: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCourse: action.payload,
    }),
    setShowModalDeleteCourse: (state, action) => ({
      ...state,
      visibleModalDeleteCourse: action.payload,
    }),
    setConfigModalCourse: (state, action) => ({
      ...state,
      configModalCourse: action.payload,
    }),
    setInfoCourses: (state, action) => ({
      ...state,
      infoCourses: action.payload,
    }),
    setErrorInfoCourses: (state, action) => ({
      ...state,
      errorInfoCourses: action.payload,
    }),
    changeHighlightCourse: (state) => ({
      ...state,
    }),
    changeHighlightCourseSuccess: (state) => ({
      ...state,
    }),
    changeHighlightCourseFailure: (state) => ({
      ...state,
    }),

    //Thêm
    setDataFilterCourse: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),

    getAllCourse: (state) => ({
      ...state,
      allCourse: [],
    }),
    getAllCourseSuccess: (state, action) => ({
      ...state,
      allCourse: action.payload.data.courses,
    }),
    getAllCourseFailure: (state) => ({
      ...state,
      allCourse: [],
    }),

    //Lớp học học viên chọn để học của khóa tập muốn đki
    setClassRegisterOfCourse: (state, action) => ({
      ...state,
      classRegisterOfCourse: action.payload,
    }),
  },
});

export const {
  getListDataCourse,
  getListDataCourseSuccess,
  getListDataCourseFailure,
  createCourse,
  createCourseSuccess,
  createCourseFailure,
  updateCourse,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourse,
  deleteCourseSuccess,
  deleteCourseFailure,
  setShowModalDeleteCourse,
  setShowModalCreateOrUpdateCourse,
  setConfigModalCourse,
  setInfoCourses,
  setErrorInfoCourses,
  changeHighlightCourse,
  changeHighlightCourseSuccess,
  changeHighlightCourseFailure,

  //Thêm
  setDataFilterCourse,

  getAllCourse,
  getAllCourseSuccess,
  getAllCourseFailure,

  //Lớp học học viên chọn để học của khóa tập muốn đki
  setClassRegisterOfCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
