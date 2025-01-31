import { getListMyCalendar, getListMyCalendarFailure, getListMyCalendarSuccess } from '@/states/modules/myCalendar';
import callApi from '../callApi';

export const requestGetMyCalendar = () => async (dispatch, getState) => {
  // const dataFilter = getState().myCourse.dataFilterMyCalendarDone;
  // let path = `user/my-calendar?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  // if (dataFilter.keySearch) {
  //   path += `&q=${dataFilter.keySearch}`;
  // }

  // if (dataFilter.sort_order) {
  //   path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  // }
  let path = `user/my-calendar`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListMyCalendar, getListMyCalendarSuccess, getListMyCalendarFailure],
    variables: {},
    dispatch,
    getState,
  });
};
