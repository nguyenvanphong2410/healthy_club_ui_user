import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import { Avatar, Col, Collapse, Row, theme } from 'antd';
import TableStudentOfClass from './components/TableStudentOfClass';
import styles from './styles.module.scss';
import './styles.scss';

const InProgressClassOfCourseOfUser = () => {
  const dataClassOfCourseOfUser = useSelector((state) => state.myCourse.dataClassOfCourseOfUser);

  const { token } = theme.useToken();
  const getItems = (panelStyle) => [
    {
      key: '1',
      label: <p className="font-semibold">Danh sách học viên</p>,
      children: <TableStudentOfClass dataClassOfCourseOfUser={dataClassOfCourseOfUser} />,
      style: panelStyle,
    },
  ];

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const displayScoreTotal = (num) => {
    let result = null;
    result = parseFloat(num.toFixed(2));
    return result;
  };

  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <div className={`${styles.contentInfoWrap}`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName}`}>Khóa tập:</span>
              <span className={`${styles.content}`}>{dataClassOfCourseOfUser?.name}</span>
            </div>
          </div>
          <div className={`${styles.contentInfoWrap} mt-3 mb-3`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName} mt-2`}>Giáo viên:</span>
              <span className={`${styles.content}`}>
                <div className={`flex`}>
                  <Avatar
                    className={`avatar-user shadow`}
                    crossOrigin="anonymous"
                    src={dataClassOfCourseOfUser?.teacher?.avatar ? dataClassOfCourseOfUser?.teacher?.avatar : ''}
                  />
                  <div className={`ml-[10px] font-medium`}>
                    <div className={`name-user cursor-pointer`}>{dataClassOfCourseOfUser?.teacher?.name}</div>
                    <a className="email-user" href={`mailto:${dataClassOfCourseOfUser?.teacher?.email}`}>
                      {dataClassOfCourseOfUser?.teacher?.email}
                    </a>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className={`${styles.contentInfoWrap}`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName}`}>Tài liệu:</span>
              <a href={dataClassOfCourseOfUser?.file_record } target="_blank" rel="noopener noreferrer">
                <span className={`${styles.content}`}>
                  {dataClassOfCourseOfUser?.file_record !== null ? (
                    <span className="text-blue-55 italic underline">Xem tài liệu lớp học tại đây...</span>
                  ) : (
                    'Đang cập nhật'
                  )}
                </span>
              </a>
            </div>
          </div>
        </Col>
        <Col span={6}>
        {/* Bỏ điểm */}
          {/* <div className={`${styles.contentInfoWrap} py-1 pl-1`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName}`}>- Điểm chuyên cần: </span>
              <span className={`${styles.content} ml-1`}>{dataClassOfCourseOfUser?.myScore.attendance_score}</span>
            </div>
          </div>
          <div className={`${styles.contentInfoWrap} p-1`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName}`}>- Điểm giữa kì: </span>
              <span className={`${styles.content} ml-1`}>{dataClassOfCourseOfUser?.myScore.midterm_score}</span>
            </div>
          </div>
          <div className={`${styles.contentInfoWrap} p-1`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName}`}>- Điểm cuối kì: </span>
              <span className={`${styles.content} ml-1`}>{dataClassOfCourseOfUser?.myScore.final_score}</span>
            </div>
          </div>
          <div className={`${styles.contentInfoWrap} p-1`}>
            <div className={`${styles.itemInfo}`}>
              <span className={`${styles.fieldName}`}>- Điểm cộng: </span>
              <span className={`${styles.content} ml-1`}>{dataClassOfCourseOfUser?.myScore.plus_score}</span>
            </div>
          </div> */}
        </Col>
        <Col span={6} className="flex justify-center items-center">
          {/* Bỏ điểm */}
          {/* <div className="flex justify-center items-center h-full w-full">
            <span className="mr-3 font-semibold">Tổng: </span>
            <span className="font-semibold text-[#9420b1] text-[50px]">
              {displayScoreTotal(
                dataClassOfCourseOfUser?.myScore.attendance_score * 0.1 +
                  dataClassOfCourseOfUser?.myScore.plus_score +
                  dataClassOfCourseOfUser?.myScore.midterm_score * 0.3 +
                  dataClassOfCourseOfUser?.myScore.final_score * 0.6
              )}
            </span>
          </div> */}
        </Col>
      </Row>

      <Collapse
        className="mt-4"
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </>
  );
};

export default InProgressClassOfCourseOfUser;
