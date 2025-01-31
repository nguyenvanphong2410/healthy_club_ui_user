import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import profileReducer from './modules/profile/index.js';
import homeSlice from './modules/home/index.js';
import courseSlice from './modules/course/index.js';
import userFeedbackSlice from './modules/userFeedback/index.js';
import orderSlice from './modules/order/index.js';
import configSlice from './modules/config/index.js';
import myCourseSlice from './modules/myCourse/index.js';
import detailsCourseSlice from './modules/course/detailsCourse/index.js';
import commentSlice from './modules/comment/index.js';
import teacherReducer from './modules/teacher/index.js';
import myCalendarSlice from './modules/myCalendar/index.js';

const rootReducer = {
  app: appReducer,
  home: homeSlice,
  auth: authReducer,
  profile: profileReducer,
  course: courseSlice,
  userFeedback: userFeedbackSlice,
  order: orderSlice,
  config: configSlice,
  myCourse: myCourseSlice,
  detailsCourse: detailsCourseSlice,
  comment: commentSlice,
  teacher: teacherReducer,
  myCalendar: myCalendarSlice,
}

export default rootReducer
