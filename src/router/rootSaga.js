import loadAuthSaga from "../states/modules/auth/saga.js";
import loadHomeSaga from "../states/modules/home/saga.js";
import loadCourseSaga from "../states/modules/course/saga.js";
import loadUserFeedbackSaga from "@/states/modules/userFeedback/saga.js";
import loadOrderSaga from "@/states/modules/order/saga.js";
import loadMyCourseSaga from "@/states/modules/myCourse/saga.js";
import loadMyCalendarSaga from "@/states/modules/myCalendar/saga.js";
import detailsCourseSaga from "@/states/modules/course/detailsCourse/saga.js";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_USER_FEEDBACK_PAGE'] = loadUserFeedbackSaga
ROUTE_SAGAS['LOAD_PACKAGE_PAGE'] = loadCourseSaga
ROUTE_SAGAS['LOAD_ORDER_PAGE'] = loadOrderSaga
ROUTE_SAGAS['LOAD_MY_COURSE_PAGE'] = loadMyCourseSaga
ROUTE_SAGAS['LOAD_MY_CALENDAR_PAGE'] = loadMyCalendarSaga
ROUTE_SAGAS['LOAD_DETAILS_COURSE_PAGE'] = detailsCourseSaga;
