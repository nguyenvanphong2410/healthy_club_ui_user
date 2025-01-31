import UserLayout from '@/layouts/UserLayout';
import styles from './styles.module.scss';
import { Steps } from 'antd';
import { useSelector } from 'react-redux';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';

function Order() {
  const orderCurrent = useSelector((state) => state.order.orderCurrent);

  const steps = [
    {
      title: 'Xác nhận',
      content: <StepOne />,
    },
    {
      title: 'Thanh toán',
      content: <StepTwo />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <UserLayout backGroundColor={'#fff'}>
      <div className={`${styles.card}`}>
        <div className={`${styles.bg}`}>
          <Steps className={`${styles.stepWrap}`} current={orderCurrent} items={items} />
          <div className={`${styles.contentWrap}`}>{steps[orderCurrent]?.content}</div>
        </div>
        <div className={`${styles.blob}`}></div>
      </div>
    </UserLayout>
  );
}

export default Order;
