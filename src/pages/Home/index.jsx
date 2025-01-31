import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import UserLayout from '@/layouts/UserLayout/index.jsx';
import styles from './styles.module.scss';
import Zalo from '@/assets/images/home/zalo.png';
import CardDoc from './components/CardDoc';
import CarouselCpn from './components/Carousel';
import InfoAbout from './components/InfoAbout';
import StudyRoadmap from './components/StudyRoadmap';
import Feedback from './components/Feedback';
import imgInfo1 from '@/assets/images/home/img1.png'
import imgInfo2 from '@/assets/images/home/img2.png'
import { useSelector } from 'react-redux';
import ListTeacher from './components/ListTeacher';

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const showBackToTopButton = scrollPosition > 250;

  const infoAboutRef = useRef(null);
  const feedbackRef = useRef(null);
  const dataConfig = useSelector((state) => state.config.config);
  

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hàm để cuộn đến InfoAbout
  const scrollToInfoAbout = () => {
    if (infoAboutRef.current) {
      infoAboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hàm để cuộn về đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hàm để cuộn đến Feedback
  const scrollToFeedback = () => {
    if (feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <UserLayout
      onScrollToInfoAbout={scrollToInfoAbout}
      onScrollToTop={scrollToTop}
      onScrollToFeedback={scrollToFeedback}
      backGroundColor={'#000'}
    >
      <div className={styles.sliderHeading}>
        <CarouselCpn />
        <CardDoc />
        <ListTeacher/>
        <img className='w-full' src={imgInfo1} alt="img" />
        <div ref={infoAboutRef}>
          <InfoAbout />
        </div>
        <StudyRoadmap />
        <div ref={feedbackRef}>
          <Feedback />
        </div>
        <img className='w-full' src={imgInfo2} alt="img" />
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '130px',
          height: '60px',
          width: '60px',
          right: '30px',
          cursor: 'pointer',
          borderRadius: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0px 7px 29px 0px',
          zIndex: 11111,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <a href={`https://zalo.me/${dataConfig?.phone}`}>
          <img style={{ width: '100%' }} src={Zalo} alt="zalo" />
        </a>
      </div>
      {showBackToTopButton && (
        <div
          style={{
            position: 'fixed',
            bottom: '50px',
            height: '60px',
            width: '60px',
            right: '30px',
            background: '#ffff',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            boxShadow:
              'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
            zIndex: 11111,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            style={{
              color: '#137bf8',
              fontWeight: '600',
              width: '30px',
              height: '3em',
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <g fill="currentColor">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </g>
          </svg>
        </div>
      )}
    </UserLayout>
  );
}

export default Home;
