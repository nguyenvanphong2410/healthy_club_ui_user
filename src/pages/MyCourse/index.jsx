import UserLayout from '@/layouts/UserLayout';
import styles from './styles.module.scss';
import {Tabs} from 'antd';
import { useEffect, useState } from 'react';
import TableMyCourseDone from './components/TableDone';
import { useDispatch } from 'react-redux';
import { requestGetMyCourseDone, requestGetMyCourseInProgress, requestGetMyCoursePending } from '@/api/myCourse';
import TableMyCourseInProgress from './components/TableInProgress';
import TableMyCoursePending from './components/TablePending';

const MyCourse = () => {
  const dispatch = useDispatch();
  
  const [tabActive, setTabActive] = useState('1');

  const items = [
    {
      key: '1',
      label: 'Khóa đang tập',
      children: <TableMyCourseInProgress />,
    },
    {
      key: '2',
      label: 'Khóa đã tập',
      children: <TableMyCourseDone />,
    },
    {
      key: '3',
      label: 'Khóa sắp tập',
      children: <TableMyCoursePending />,
    },
  ];
  
  useEffect(() => {
    if (tabActive === '1') {
      dispatch(requestGetMyCourseInProgress());
    }

    if (tabActive === '2') {
      dispatch(requestGetMyCourseDone());
    }
    
    if (tabActive === '3') {
      dispatch(requestGetMyCoursePending());
    }
  }, [tabActive]);

  const onChange = (key) => {
    setTabActive(key)
  };

  return (
    <>
      <UserLayout>
        <div className={`${styles.myDocContainer}`}>
          <Tabs className={`${styles.wrapTab}`} items={items} accessKey={tabActive} onChange={onChange}/>
        </div>
      </UserLayout>
    </>
  );
};

export default MyCourse;
