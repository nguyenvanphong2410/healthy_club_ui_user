import React, { useEffect } from 'react';
import { Input } from 'antd';
import styles from './styles.module.scss';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '@/utils/hooks/useWindowSize.js';
import TableDefault from '@/components/Table';
import moment from 'moment';
import { formatMoney } from '@/utils/helper';
import { setClassOfCourseOfUserSelected, setDataFilterMyCoursesInProgress, setVisibleModalClassOfCourseOfUser } from '@/states/modules/myCourse';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { requestGetClassOfCourseOfUser, requestGetMyCourseInProgress } from '@/api/myCourse';
import _ from 'lodash';
import ModalDefault from '@/components/Modal';
import InProgressClassOfCourseOfUser from './components/InProgressClassOfCourseOfUser';

export default function TableMyCourseInProgress() {
  const dispatch = useDispatch();
  const windowWidth = useWindowSize().width;

  const myCoursesInProgress = useSelector((state) => state.myCourse.myCoursesInProgress);
  const isLoadingMyCoursesInProgress = useSelector((state) => state.myCourse.isLoadingMyCoursesInProgress);
  const paginationListCoursesInProgress = useSelector((state) => state.myCourse.paginationListCoursesInProgress);
  const dataFilterMyCoursesInProgress = useSelector((state) => state.myCourse.dataFilterMyCoursesInProgress);
  const visibleModalClassOfCourseOfUser = useSelector((state) => state.myCourse.visibleModalClassOfCourseOfUser);
  const classOfCourseOfUserSelected = useSelector((state) => state.myCourse.classOfCourseOfUserSelected);
  const dataClassOfCourseOfUser = useSelector((state) => state.myCourse.dataClassOfCourseOfUser);

  const debouncedQuery = useDebounce(dataFilterMyCoursesInProgress.keySearch, 500);

  useEffect(() => {
    dispatch(setDataFilterMyCoursesInProgress({ ...dataFilterMyCoursesInProgress, keySearch: debouncedQuery }));
    dispatch(requestGetMyCourseInProgress());
  }, [debouncedQuery]);

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: 200,
      showSorterTooltip: false,
      render: (text) => <span className={'font-bold'}>{text}</span>,
    },
    {
      title: 'Tên khóa',
      dataIndex: 'name',
      key: 'name',
      showSorterTooltip: false,
      render: (text, record) => (
        <span 
          className="text-[#3061d2] font-semibold cursor-pointer" 
          onClick={() => handleShowModalClassOfCourseOfUser(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      showSorterTooltip: false,
      render: (text, record) => (
        <div>
          <p className={`${styles.originalPrice}`}>{formatMoney(record.original_price)}</p>
          <p className={`${styles.currentPrice}`}>{formatMoney(record.current_price)}</p>
        </div>
      ),
    },
    {
      title: <span className="title-table">Thời gian học</span>,
      dataIndex: 'time',
      key: 'time',
      align: 'end',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div>
            <p>{moment(record?.start_time).format('DD/MM/YYYY')}</p>
            <p>đến {moment(record?.end_time).format('DD/MM/YYYY')}</p>
          </div>
        );
      },
    },
  ];

  const handleShowModalClassOfCourseOfUser = (record) => {
    dispatch(requestGetClassOfCourseOfUser(record._id))
    dispatch(setVisibleModalClassOfCourseOfUser(true));
    dispatch(setClassOfCourseOfUserSelected(record));
  };

  const handleCloseVisibleModalClassOfCourseOfUser = () => {
    dispatch(setVisibleModalClassOfCourseOfUser(false));
  }

  const handleChangeTable = (pagination, filters, sorter) => {
    let newDataFilter = _.cloneDeep(dataFilterMyCoursesInProgress);
    newDataFilter.order = null;
    newDataFilter.column = null;
    if (sorter.order && sorter.field) {
      newDataFilter.order = sorter.order === 'descend' ? 'desc' : 'asc';
      newDataFilter.column = sorter.field;
    }
    dispatch(setDataFilterMyCoursesInProgress(newDataFilter));
    dispatch(requestGetMyCourseInProgress(newDataFilter));
  };

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilterMyCoursesInProgress);
    newDataFilter.page = value;
    dispatch(setDataFilterMyCoursesInProgress(newDataFilter));
    dispatch(requestGetMyCourseInProgress(newDataFilter));
  };

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilterMyCoursesInProgress);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilterMyCoursesInProgress(newDataFilter));
    dispatch(requestGetMyCourseInProgress(newDataFilter));
  };

  return (
    <div>
      <div className={styles.listWrap}>
        <div className={styles.filterWrap}>
          <div className={styles.search}>
            <Input
              prefix={<img src={SearchIcon} className={`w-3.5 mr-1.5`} alt="" />}
              className={`main-input`}
              placeholder={'Tìm kiếm theo mã hoặc tên'}
              value={dataFilterMyCoursesInProgress.keySearch}
              onChange={(e) =>
                dispatch(
                  setDataFilterMyCoursesInProgress({
                    ...dataFilterMyCoursesInProgress,
                    keySearch: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={styles.action}></div>
        </div>

        <div className={'tableWrap h-[calc(100vh-380px)]'}>
          <TableDefault
            loading={isLoadingMyCoursesInProgress}
            dataSource={myCoursesInProgress}
            pagination={paginationListCoursesInProgress}
            isFixed
            extraClassName={'h-[calc(100vh-430px)]'}
            scroll={{
              x: 1000,
              y:
                windowWidth <= 576
                  ? 'calc(100vh - 439px)'
                  : windowWidth <= 1536
                  ? 'calc(100vh - 370px)'
                  : 'calc(100vh - 342px)',
            }}
            limitTable={dataFilterMyCoursesInProgress.perPage}
            rowKey={(record) => record._id}
            columns={columns}
            handleSelectPagination={(e) => handleSelectPagination(e)}
            handleSelectLimitTable={(e) => handleSelectLimitTable(e)}
            onChange={handleChangeTable}
          />

          <ModalDefault
            isModalOpen={visibleModalClassOfCourseOfUser}
            handleCancel={() => handleCloseVisibleModalClassOfCourseOfUser()}
            title={`Thông tin lớp học ${dataClassOfCourseOfUser?.name} của ${classOfCourseOfUserSelected?.name} `}
            width={1200}
          >
            <InProgressClassOfCourseOfUser/>
          </ModalDefault>
        </div>
      </div>
    </div>
  );
}
