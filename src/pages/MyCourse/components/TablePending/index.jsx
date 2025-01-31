import React, { useEffect } from 'react';
import { Input } from 'antd';
import styles from './styles.module.scss';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '@/utils/hooks/useWindowSize.js';
import TableDefault from '@/components/Table';
import moment from 'moment';
import { formatMoney } from '@/utils/helper';
import { setClassOfCourseOfUserSelected, setDataFilterMyCoursesPending, setVisibleModalClassOfCourseOfUser } from '@/states/modules/myCourse';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { requestGetClassOfCourseOfUser, requestGetMyCoursePending } from '@/api/myCourse';
import _ from 'lodash';

export default function TableMyCoursePending() {
  const dispatch = useDispatch();
  const windowWidth = useWindowSize().width;

  
  const myCoursesPending = useSelector((state) => state.myCourse.myCoursesPending);
  const isLoadingMyCoursesPending = useSelector((state) => state.myCourse.isLoadingMyCoursesPending);
  const paginationListCoursesPending = useSelector((state) => state.myCourse.paginationListCoursesPending);
  const dataFilterMyCoursesPending = useSelector((state) => state.myCourse.dataFilterMyCoursesPending);
  
  const debouncedQuery = useDebounce(dataFilterMyCoursesPending.keySearch, 500);

  useEffect(() => {
    dispatch(setDataFilterMyCoursesPending({ ...dataFilterMyCoursesPending, keySearch: debouncedQuery }));
    dispatch(requestGetMyCoursePending());
  }, [debouncedQuery]);

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      showSorterTooltip: false,
      sorter: (a, b) => a.age - b.age,
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


  const handleChangeTable = (pagination, filters, sorter) => {
    let newDataFilter = _.cloneDeep(dataFilterMyCoursesPending);
    newDataFilter.order = null;
    newDataFilter.column = null;
    if (sorter.order && sorter.field) {
      newDataFilter.order = sorter.order === "descend" ? "desc" : "asc";
      newDataFilter.column = sorter.field;
    }
    dispatch(setDataFilterMyCoursesPending(newDataFilter));
    dispatch(requestGetMyCoursePending(newDataFilter));
  }

  const handleSelectPagination = (value) => {
    let newDataFilter = _.cloneDeep(dataFilterMyCoursesPending);
    newDataFilter.page = value;
    dispatch(setDataFilterMyCoursesPending(newDataFilter));
    dispatch(requestGetMyCoursePending(newDataFilter));
  }

  const handleSelectLimitTable = (value) => {
    let newDataFilter = _.cloneDeep(dataFilterMyCoursesPending);
    newDataFilter['page'] = 1;
    newDataFilter['perPage'] = value;
    dispatch(setDataFilterMyCoursesPending(newDataFilter));
    dispatch(requestGetMyCoursePending(newDataFilter));
  }

  return (
    <div>
      <div className={styles.listWrap}>
        <div className={styles.filterWrap}>
          <div className={styles.search}>
            <Input
              prefix={<img src={SearchIcon} className={`w-3.5 mr-1.5`} alt="" />}
              className={`main-input`}
              placeholder={'Tìm kiếm theo mã hoặc tên'}
              value={dataFilterMyCoursesPending.keySearch}
              onChange={(e) =>
                dispatch(
                  setDataFilterMyCoursesPending({
                    ...dataFilterMyCoursesPending,
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
            loading={isLoadingMyCoursesPending}
            dataSource={myCoursesPending}
            pagination={paginationListCoursesPending}
            isFixed
            extraClassName={'h-[calc(100vh-430px)]'}
            scroll={{
              x: 1000,
              y:
                windowWidth <= 576
                  ? 'calc(100vh - 310px)'
                  : windowWidth <= 1536
                  ? 'calc(100vh - 370px)'
                  : 'calc(100vh - 342px)',
            }}
            limitTable={dataFilterMyCoursesPending.perPage}
            rowKey={(record) => record._id}
            columns={columns}
            handleSelectPagination={(e) => handleSelectPagination(e)}
            handleSelectLimitTable={(e) => handleSelectLimitTable(e)}
            onChange={handleChangeTable}
          />
        </div>
      </div>
    </div>
  );
}
