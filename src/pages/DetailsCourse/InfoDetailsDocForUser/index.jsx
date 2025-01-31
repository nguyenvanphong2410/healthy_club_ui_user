import React, { useState } from 'react';
import { Button, Col, Radio, Row, Space } from 'antd';
import styles from './style.module.scss';
import { FieldTimeOutlined, HighlightOutlined, PicLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setClassRegisterOfCourse } from '@/states/modules/course';
import { dayjsFormatSort, formatMoney } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';
import { setCourseSelectedToOrder } from '@/states/modules/order';

const InfoDetailsDocForUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseDetails = useSelector((state) => state.detailsCourse.courseDetails);
  const authUser = useSelector((state) => state.auth.authUser);

  const [selectedClassId, setSelectedClassId] = useState(null);

  const handleChangeRadioSelectClass = (classId) => {
    setSelectedClassId(classId);
    dispatch(setClassRegisterOfCourse(classId));
  };

  const handleClickRegisterCourse = (courseDetails) => {
    navigate('/order');
    dispatch(setCourseSelectedToOrder(courseDetails));
  };

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <PicLeftOutlined /> Mã khóa tập: 
            </span>
            <span className={styles.info}>{courseDetails?.code}</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
        <div className={`${styles.infoItem} flex`}>
            <span className={styles.titleOrigin}>
              <PicLeftOutlined /> Giá:
            </span>
            <div className="text-[13px] font-normal block ml-1">
              <del className="text-[#bb2a2a] italic">{formatMoney(courseDetails.original_price)}</del> |{' '}
              <span className="text-green-45 font-bold">{formatMoney(courseDetails.current_price)}</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <PicLeftOutlined /> Số lượng học viên :
            </span>
            <span className={styles.info}> {courseDetails?.student_of_course?.length} học viên</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            <span className={styles.titleOrigin}>
              <FieldTimeOutlined /> Thời gian học:
            </span>
            <span className={styles.info}> {dayjsFormatSort(courseDetails?.start_time)} đến {dayjsFormatSort(courseDetails?.end_time)}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={styles.infoItem}>
            {!authUser.userCourses.some((itemPkg) => itemPkg?._id === courseDetails?._id) && (
              <div className={`${styles.infoItem}`}>
                <span className={styles.titleOrigin}>
                  <HighlightOutlined /> Lớp
                </span>
                <span className={`${styles.nameField}`}></span>
                <Radio.Group
                  className="ml-[20px]"
                  onChange={(e) => handleChangeRadioSelectClass(e.target.value)}
                  value={selectedClassId}
                >
                  <Space direction="vertical">
                    {courseDetails?.classes?.map((classItem) => (
                      <Radio key={classItem?._id} value={classItem?._id}>
                        {classItem?.name}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className={`${styles.colRight} justify-end`}>
          <div className={styles.infoItem}>
            {!authUser.userCourses.some((itemPkg) => itemPkg?._id === courseDetails?._id) && selectedClassId && (
              <Button
                type="primary"
                size="large"
                className="main-btn-primary"
                onClick={() => handleClickRegisterCourse(courseDetails)}
              >
                Đăng ký ngay
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default InfoDetailsDocForUser;
