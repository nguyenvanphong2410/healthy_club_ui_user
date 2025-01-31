import React, { useState } from 'react';
import UserLayout from '@/layouts/UserLayout';
import './styles.scss';
import styles from './styles.module.scss';
import moment from 'moment';
import { Avatar, Badge, Calendar, Col, Row, Select, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formatLocalDateTime, STATUS_BOOKING } from '@/utils/constants';
import ModalDefault from '@/components/Modal';
import { setVisibleModalInfoClassOfCalendar } from '@/states/modules/myCalendar';
import imageDefaultClass from '@/assets/images/default/image-default.png';

function MyCalendar() {
  const dispatch = useDispatch();

  const { Option } = Select;
  const myCalendar = useSelector((state) => state.myCalendar.myCalendar);
  const visibleModalInfoClassOfCalendar = useSelector((state) => state.myCalendar.visibleModalInfoClassOfCalendar);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  //handleStatusToolTip
  const handleStatusToolTipOrigin = (startTime, currentTime, endTime, cancelTime) => {
    if (startTime > currentTime && !cancelTime) {
      return 'pending';
    } else if (startTime <= currentTime && endTime > currentTime && !cancelTime) {
      return 'processing';
    } else if (endTime <= currentTime && !cancelTime) {
      return 'success';
    } else if (cancelTime) {
      return 'cancel';
    }
  };

  //handleType
  const handleType = (startTime, currentTime, endTime) => {
    if (startTime > currentTime) {
      return 'warning';
    } else if (startTime <= currentTime && endTime > currentTime) {
      return 'processing';
    } else if (endTime <= currentTime) {
      return 'success';
    }
  };

  const handleDisplayStatusClass = (start_time, end_time) => {
    if (!start_time || !end_time) {
      return 'success';
    }

    const now = new Date();
    let result = null;

    if (new Date(start_time) < now && new Date(end_time) < now) {
      result = 'success';
    } else if (new Date(start_time) <= now && new Date(end_time) > now) {
      result = 'processing';
    } else if (new Date(start_time) > now && new Date(end_time) > now) {
      result = 'warning';
    }

    return result;
  };

  //getListData
  const getListData = (value, selectedOption) => {
    const listData = [];
    const momentObject = moment({
      year: value.$y,
      month: value.$M,
      date: value.$D,
      hour: value.$H,
      minute: value.$m,
      second: value.$s,
      millisecond: value.$ms,
    });

    const selectedDate = momentObject.format('DD/MM/YYYY');
    const now = new Date();

    myCalendar?.forEach((item) => {
      // Tạo danh sách các ngày nằm trong khoảng startDateTime và endDateTime
      const startDate = moment(item.start_time);
      const endDate = moment(item.end_time);
      const daysInRange = [];
      for (let m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
        daysInRange.push(m.format('DD/MM/YYYY'));
      }

      // Kiểm tra nếu selectedDate nằm trong daysInRange
      if (daysInRange.includes(selectedDate)) {
        switch (selectedOption) {
          case null:
            listData.push({
              type: handleDisplayStatusClass(item.start_time, item.end_time),
              name: item.name,
              start_time: item.start_time,
              end_time: item.end_time,
              course: item.course,
              teacher: item.teacher,
              code: item.code,
              image_featured: item.image_featured,
              images: item.images,
            });
            break;
          case selectedOption:
            if (
              selectedOption === STATUS_BOOKING.PENDING &&
              new Date(item.start_time) > now &&
              new Date(item.end_time) > now
            ) {
              listData.push({
                type: 'warning',
                name: item.name,
                start_time: item.start_time,
                end_time: item.end_time,
                course: item.course,
                teacher: item.teacher,
                code: item.code,
                image_featured: item.image_featured,
                images: item.images,
              });
            }
            if (
              selectedOption === STATUS_BOOKING.PROCESSING &&
              new Date(item.start_time) < now &&
              new Date(item.end_time) > now
            ) {
              listData.push({
                type: 'processing',
                name: item.name,
                start_time: item.start_time,
                end_time: item.end_time,
                course: item.course,
                teacher: item.teacher,
                code: item.code,
                image_featured: item.image_featured,
                images: item.images,
              });
            }
            if (
              selectedOption === STATUS_BOOKING.SUCCESS &&
              new Date(item.start_time) < now &&
              new Date(item.end_time) < now
            ) {
              listData.push({
                type: 'success',
                name: item.name,
                start_time: item.start_time,
                end_time: item.end_time,
                course: item.course,
                teacher: item.teacher,
                code: item.code,
                image_featured: item.image_featured,
                images: item.images,
              });
            }
            break;
          default:
            break;
        }
      }
    });

    return listData;
  };

  const handleShowModalInfoClass = (item) => {
    setSelectedClass(item);
    dispatch(setVisibleModalInfoClassOfCalendar(true));
  };

  const handleCancelModalInfoClassOfCalendar = () => {
    dispatch(setVisibleModalInfoClassOfCalendar(false));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, selectedStatus);

    return (
      <ul className={styles.list_booking}>
        {listData.map((item, index) => (
          <li key={index}>
            <>
              <Tooltip title={item.name} placement="top">
                <Badge
                  className={styles.booking_item}
                  description={item.description}
                  status={item.type}
                  text={item.name}
                  onClick={() => handleShowModalInfoClass(item)}
                />
              </Tooltip>
            </>
          </li>
        ))}
      </ul>
    );
  };

  //cellRender
  const cellRender = (current, info) => {
    return info.type === 'date' ? dateCellRender(current) : info.originNode;
  };

  return (
    <UserLayout>
      <div className={styles.calendar_wrapper}>
        <div className={styles.title}>
          <p>Lịch tập của bạn</p>
        </div>
        <Select
          allowClear
          value={selectedStatus}
          placeholder="Chọn trạng thái"
          className={`${styles.select_status}`}
          onChange={(value) => setSelectedStatus(value || null)}
        >
            <Option value={STATUS_BOOKING.PENDING} ><Badge status={'warning'} className={`text-orange-45` } text={'Chưa diễn ra'} /></Option>
          <Option value={STATUS_BOOKING.PROCESSING}><Badge status={'processing'} className={`text-orange-45` } text={'Đang diễn ra'} /></Option>
          <Option value={STATUS_BOOKING.SUCCESS}><Badge status={'success'} className={`text-orange-45` } text={'Hoàn thành'} /></Option>
        </Select>
        <Calendar
          className={`${styles.calendar} calendarBooking`}
          cellRender={cellRender}
          locale={formatLocalDateTime}
        />
      </div>
      <ModalDefault
        isModalOpen={visibleModalInfoClassOfCalendar}
        handleCancel={handleCancelModalInfoClassOfCalendar}
        title={'Thông tin lớp'}
        width={700}
      >
        <Row gutter={20}>
          <Col span={10}>
            <img
              src={
                selectedClass?.image_featured ? selectedClass?.image_featured : imageDefaultClass
              }
              crossOrigin="anonymous"
              alt="img-class"
              className={`${styles.pictures} cursor-pointer`}
            />
          </Col>
          <Col span={14}>
            <div className={`${styles.contentInfoWrap}`}>
              <div className={`${styles.classSelectedInfo}`}>
                <span className={`${styles.fieldName}`}>Mã số: </span>
                <span className={`${styles.content}`}>{selectedClass?.code}</span>
              </div>
            </div>
            <div className={`${styles.contentInfoWrap}`}>
              <div className={`${styles.classSelectedInfo}`}>
                <span className={`${styles.fieldName}`}>Tên: </span>
                <span className={`${styles.content}`}>{selectedClass?.name}</span>
              </div>
            </div>
            <div className={`${styles.contentInfoWrap}`}>
              <div className={`${styles.classSelectedInfo}`}>
                <span className={`${styles.fieldName}`}>Thời gian: </span>
                <span className={`${styles.content}`}>
                  {moment(selectedClass?.start_time).format('DD/MM/YYYY')} -{' '}
                  {moment(selectedClass?.end_time).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>
            <div className={`${styles.contentInfoWrap}`}>
              <div className={`${styles.classSelectedInfo}`}>
                <span className={`${styles.fieldName}`}>Khóa thể thao: </span>
                <span className={`${styles.content}`}>{selectedClass?.course.name}</span>
              </div>
            </div>
            <div className={`${styles.contentInfoWrap}`}>
                <div className={`${styles.classSelectedInfo}`}>
                  <span className={`${styles.fieldName} mt-3`}>Huấn luyện viên: </span>
                  <div className={`flex`}>
                    <Avatar
                      className={`avatar-user shadow`}
                      crossOrigin="anonymous"
                      src={selectedClass?.teacher?.avatar ? selectedClass?.teacher?.avatar : ''}
                    />
                    <div className={`ml-[10px] font-medium`}>
                      <div className={`name-user cursor-pointer`}>{selectedClass?.teacher?.name}</div>
                      <a className="email-user" href={`mailto:${selectedClass?.teacher?.email}`}>
                        {selectedClass?.teacher?.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </Col>
        </Row>
      </ModalDefault>
    </UserLayout>
  );
}

export default MyCalendar;
