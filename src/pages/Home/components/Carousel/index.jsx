import slide1 from '@/assets/images/banner/slide-1.jpeg';
import slide2 from '@/assets/images/banner/slide-2.jpg';
import slide3 from '@/assets/images/banner/slide-3.jpg';
import slide4 from '@/assets/images/banner/slide-4.jpg';
import styles from './styles.module.scss';
import {Carousel} from 'antd';

const CarouselCpn = () => {

    return (
        <>
        <div className={styles.sliderHeading}>
            <Carousel className={`animate-glo pop-glo ${styles.carouselWrap}`} autoplay autoplaySpeed={2000}>
              <div>
                <img className={styles.imgSlide} src={slide1} alt="" />
              </div>
              <div>
                <img className={styles.imgSlide} src={slide2} alt="" />
              </div>
              <div>
                <img className={styles.imgSlide} src={slide3} alt="" />
              </div>
              <div>
                <img className={styles.imgSlide} src={slide4} alt="" />
              </div>
            </Carousel>
          </div>
        </>
    )
}

export default CarouselCpn;