import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { rootLoader } from './rootLoader.js';
import Login from '../pages/Auth/Login';
import Order from '@/pages/Order';
import Register from '@/pages/Auth/Register';
import MyCourse from '@/pages/MyCourse';
import DetailsCourse from '@/pages/DetailsCourse';
import PageError from '@/components/Error';
import { PAGE_ERROR } from '@/utils/constants';
import MyCalendar from '@/pages/MyCalendar';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
    loader: ({ request, params }) => rootLoader({ request, params }, false, 'LOAD_AUTH_PAGE'),
  },
  {
    path: '/login',
    element: <Login />,
    loader: ({ request, params }) => rootLoader({ request, params }, false, 'LOAD_AUTH_PAGE'),
  },
  {
    path: '',
    element: <Home />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_HOME_PAGE'),
  },
  {
    path: '/order',
    element: <Order />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_ORDER_PAGE'),
  },
  // {
  //   path: '/my-courses',
  //   element: <MyCourse />,
  //   loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_MY_COURSE_PAGE'),
  // },
  // {
  //   path: '/my-calendar',
  //   element: <MyCalendar/>,
  //   loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_MY_CALENDAR_PAGE'),
  // },
  {
    path: '/details-course/:id',
    element: <DetailsCourse />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, 'LOAD_DETAILS_COURSE_PAGE', []),
  },
  {
    path: '/403',
    element: <PageError type={PAGE_ERROR.FORBIDDEN} title={'Bạn không có quyền truy cập!'} />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, ''),
  },
  {
    path: '*',
    element: <PageError type={PAGE_ERROR.NOT_FOUND} title={'Trang bạn truy cập không tồn tại!'} />,
    loader: ({ request, params }) => rootLoader({ request, params }, true, ''),
  },
]);

export default router;
