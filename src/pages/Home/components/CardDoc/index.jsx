import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Button, Col, Radio, Row, Space } from 'antd';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '@/utils/helper';
import PaginationDocument from './components/Panigation';
import imageDefaultClass from '@/assets/images/default/image-default.png';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { setCourseSelectedToOrder } from '@/states/modules/order';
import { setClassRegisterOfCourse } from '@/states/modules/course';
import NoData from '@/components/NoData';

const CardDoc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const authUser = useSelector((state) => state.auth.authUser);

  // State lưu trữ _id của lớp được chọn cuối cùng
  const [selectedClassId, setSelectedClassId] = useState(null);
  // State lưu trữ khóa tập hiện tại
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleClickRegisterCourse = (item) => {
    navigate('/order');
    dispatch(setCourseSelectedToOrder(item));
  };

  const handleChangeRadioSelectClass = (courseId, classId) => {
    // Cập nhật lớp được chọn mới và khóa tập tương ứng, đồng thời xóa lựa chọn trước đó
    setSelectedClassId(classId);
    setSelectedCourseId(courseId);
    // Lưu _id của lớp học vào redux store
    dispatch(setClassRegisterOfCourse(classId));
  };

  const hanleClickViewDetails = (item) => {
    navigate(`/details-course/${item._id}`);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.title} animate-glo pop-glo`}>
        Khóa tập <span className={`${styles.titlePart}`}>Thể thao</span>{' '}
      </div>
      <div className={`${styles.subtitle} animate-glo pop-glo`}>
        Với lỗ lực đem đến những khóa tập thể thao phù hợp và chất lượng
      </div>
      {courses?.length > 0 ? (
        <>
          <Row gutter={[10, 10]}>
            {courses?.map((item, index) => {
              const isSelectedCourse = item._id === selectedCourseId; // Kiểm tra xem có phải khóa tập đang được chọn không
              return (
                <Col xs={24} sm={24} md={24} lg={12} key={index}>
                  <div>
                    <div className="wrap animate pop">
                      <div className="overlay">
                        <div className="overlay-content animate slide-left delay-2">
                          <p className="animate slide-left pop delay-4 text-name-course">{item?.name}</p>
                          {/* <div className="animate slide-left pop delay-5 text-price-course ">
                            <span className="discount">{formatMoney(item?.original_price)}</span>
                            <p className="price-now">{formatMoney(item?.current_price)}</p>
                          </div> */}
                        </div>
                        <div
                          className="image-content animate slide delay-5"
                          style={{
                            backgroundImage: `url(${item.image_featured ? item.image_featured : imageDefaultClass})`,
                          }}
                        ></div>
                        <div className="dots animate">
                          <div className="dot animate slide-up delay-6"></div>
                          <div className="dot animate slide-up delay-7"></div>
                          <div className="dot animate slide-up delay-8"></div>
                        </div>
                      </div>
                      <div className="text">
                        <div className={`${styles.titleCourseCard}`}>
                          <span className={`${styles.titleCard}`}>Thông tin</span>
                          {!authUser.userCourses.some((itemPkg) => itemPkg?._id === item?._id) && (
                            <Button
                              size={'large'}
                              className={`${isSelectedCourse && selectedClassId ? 'main-btn-primary' : ''} !w-auto`}
                              // onClick={() => handleClickRegisterCourse(item)}
                              disabled={!isSelectedCourse || !selectedClassId} // Chỉ bật nút khi có lớp được chọn và khóa tập này đang được chọn
                            >
                              Đăng ký ngay
                            </Button>
                          )}
                        </div>
                        <a
                          className="text-[#235dff] cursor-pointer italic underline"
                          onClick={() => hanleClickViewDetails(item)}
                        >
                          Xem chi tiết
                        </a>
                        <p className={styles.gt}>** Hãy chọn lớp học phù hợp sau đó bạn sẽ đăng ký khóa tập này</p>
                        <div className={`${styles.infoCourseWrap}`}>
                          <div className={`${styles.infoItem}`}>
                            <span className={`${styles.nameField}`}>- Tên khóa tập:</span>
                            <span className={`${styles.contentField}`}>{item?.name}</span>
                          </div>
                          <div className={`${styles.infoItem}`}>
                            <span className={`${styles.nameField}`}>- Mã khóa tập:</span>
                            <span className={`${styles.contentField}`}>{item?.code}</span>
                          </div>
                          <div className={`${styles.infoItem}`}>
                            <span className={`${styles.nameField}`}>- Giá:</span>
                            <span className={`${styles.contentField}`}>
                              <span className={`${styles.originalPrice}`}>{formatMoney(item?.original_price)}</span>
                              <span> | </span>
                              <span className={`${styles.currentPrice}`}>{formatMoney(item?.current_price)}</span>
                            </span>
                          </div>
                          <div className={`${styles.infoItem}`}>
                            <span className={`${styles.nameField}`}>- Thời gian học:</span>
                            <span className={`${styles.contentField}`}>
                              {moment(item.start_time).format('DD/MM/YYYY')} -{' '}
                              {moment(item.end_time).format('DD/MM/YYYY')}
                            </span>
                          </div>

                          {!authUser.userCourses.some((itemPkg) => itemPkg?._id === item?._id) && (
                            <div className={`${styles.infoItem}`}>
                              <span className={`${styles.nameField}`}>- Chọn lớp:</span>
                              <span className={`${styles.contentField}`}>
                                <Radio.Group
                                  className="ml-[20px]"
                                  onChange={(e) => handleChangeRadioSelectClass(item._id, e.target.value)}
                                  value={isSelectedCourse ? selectedClassId : null} // Chỉ hiển thị lớp đã chọn nếu khóa tập này đang được chọn
                                >
                                  <Space direction="vertical">
                                    {item?.classes?.map((classItem, classIndex) => {
                                      return (
                                        <Radio key={classIndex} value={classItem?._id}>
                                          {classItem?.name}
                                        </Radio>
                                      );
                                    })}
                                  </Space>
                                </Radio.Group>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          <PaginationDocument />
        </>
      ) : (
        <NoData description={'Không có khóa tập !'} />
      )}
    </div>
  );
};

export default CardDoc;
