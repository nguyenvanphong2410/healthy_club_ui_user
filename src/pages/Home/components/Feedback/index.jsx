import styles from './styles.module.scss';
import './styles.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleGetUserFeedback } from '@/api/userFeedback';

export default function Feedback() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.userFeedback.feedbacks);
  useEffect(() => {
    dispatch(handleGetUserFeedback());
  }, []);

  return (
    <div className={`${styles.testimonialWrap}`}>
      <div className={`${styles.titleWrap}`}>
        <div className={`text-center fs-60 ${styles.title}`}>
          Hội Viên <span className={`${styles.titlePart}`}>Cảm Nhận</span>
        </div>
        <div className={`${styles.line}`}></div>
        <div className={`${styles.subtitle}`}>Cảm nhận của hội viên sau khi tham gia </div>
      </div>
      <div>
        <Row gutter={[20, 20]} className={`${styles.mainWrap}`}>
          <Col span={6}>
            <article className="profile">
              <div className="image-cover" style={{ backgroundImage: `url(${feedbacks[0]?.cover.url})` }}></div>

              <div className="profile-image">
                <img src={feedbacks[0]?.avatar.url} />
              </div>
              <h2 className="profile-username">{feedbacks[0]?.name}</h2>
              {/* <small className="profile-user-handle">nguoidung@gmail.com</small> */}
              <div className="profile-actions">
                <p dangerouslySetInnerHTML={{ __html: feedbacks[0]?.content }}></p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className="profile">
              <div className="image-cover" style={{ backgroundImage: `url(${feedbacks[1]?.cover.url})` }}></div>
              <div className="profile-image">
                <img src={feedbacks[1]?.avatar.url} />
              </div>
              <h2 className="profile-username">{feedbacks[1]?.name}</h2>
              <div className="profile-actions">
                <p dangerouslySetInnerHTML={{ __html: feedbacks[1]?.content }}></p>
              </div>
            </article>
          </Col>
          <Col span={6}>
            <article className="profile">
              <div className="image-cover" style={{ backgroundImage: `url(${feedbacks[2]?.cover.url})` }}></div>
              <div className="profile-image">
                <img src={feedbacks[2]?.avatar.url} />
              </div>
              <h2 className="profile-username">{feedbacks[2]?.name}</h2>
              <div className="profile-actions">
                <p dangerouslySetInnerHTML={{ __html: feedbacks[2]?.content }}></p>
              </div>
            </article>
          </Col>
        </Row>
      </div>
    </div>
  );
}
