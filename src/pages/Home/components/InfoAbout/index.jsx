import { Col, Row } from 'antd';
import styles from './styles.module.scss';
import namChau from '@/assets/images/home/nam-chau.png';
const InfoAbout = () => {
  return (
    <div className={styles.infoAboutWrap}>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={`${styles.imgNamChau} animate-glo pop-glo`}>
            <img src={namChau} alt="nam-chau" />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className={`${styles.textRight} animate-glo pop-glo`}>
            <h2>Chúng tôi luôn lỗ lực đem đến cho bạn những khóa tập thể thao phù hợp và chất lượng</h2>
            <p className={`${styles.textDes}`}>
              Với kim chỉ nam 'Đóng góp nâng tầm sức khỏe Việt', chúng tôi đã xây dựng những bài tập giúp cải thiện sức khỏe và vóc dáng của bạn nhanh chóng và an toàn nhất.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoAbout;
