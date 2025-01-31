import React from 'react';
import styles from './style.module.scss';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDataFilterCourse } from '@/states/modules/course';
import { handleGetListDataCourses } from '@/api/course';

function PaginationDocument() {
    const dispatch = useDispatch();

    const dataFilter = useSelector(state => state.course.dataFilter)
    const paginationListDocument = useSelector((state) => state.course.paginationListCourse);


    const handleChangePage = (e) => {
        dispatch(setDataFilterCourse({ ...dataFilter, page: e }))
        dispatch(handleGetListDataCourses());
    }
    return (
        <div className={styles.paginationWrap}>
            <Pagination
                responsive
                onChange={handleChangePage}
                current={paginationListDocument.currentPage}
                pageSize={paginationListDocument.perPage || 10}
                total={paginationListDocument.totalRecord}
                showSizeChanger={false}
            />

        </div>
    )
}

export default PaginationDocument;