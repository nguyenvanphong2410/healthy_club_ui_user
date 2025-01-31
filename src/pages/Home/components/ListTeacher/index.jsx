import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import './styles.scss';
import Item from 'antd/es/list/Item';

const ListTeacher = () => {
  const allTeacher = useSelector((state) => state.teacher.allTeacher);
  const newAll = [...allTeacher, ...allTeacher, ...allTeacher, ...allTeacher];
  
  return (
    <>
      <div className={styles.sliderHeading}>
        <div className={`${styles.title} animate-glo pop-glo`}>
          <span className={`${styles.titlePart}`}>Huấn luyện viên</span>{' '}
        </div>
        <div className={`${styles.subtitle} animate-glo pop-glo`}>
          Đội ngũ huấn luyện viên có nhiều kinh nghiệm
        </div>
        <div className="card">
          <div className="emojis">
            {newAll.length > 0
              ? newAll.map((item, index) => (
                  <div className="inline-block" key={index}>
                    <div className="card-item">
                      <div className="card-img">{/* <img src={item?.avatar} alt="" /> */}</div>
                      <div className="card-avatar">
                        <img src={item?.avatar} alt="" />
                      </div>
                      <div className="card-title">{item?.name}</div>
                      <div className="card-subtitle">{item?.email}</div>
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTeacher;
