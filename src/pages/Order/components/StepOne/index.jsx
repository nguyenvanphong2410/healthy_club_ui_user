import { Button, Divider, Empty } from 'antd';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { requestCreateOrderAndQR } from '@/api/order';
import { setOrderCurrent } from '@/states/modules/order';
import { formatMoney } from '@/utils/helper';

function StepOne() {
  const dispatch = useDispatch();

  const courseSelectedToOrder = useSelector((state) => state.order.courseSelectedToOrder);
  const classRegisterOfCourse = useSelector((state) => state.course.classRegisterOfCourse);

  const handleClickPay = () => {
    dispatch(requestCreateOrderAndQR(courseSelectedToOrder._id, classRegisterOfCourse));
    dispatch(setOrderCurrent(1));
  }
  
  return (
    <>
      {courseSelectedToOrder._id ? (
        <div className="flex justify-center w-full ">
          <div className="max-w-[620px] md:max-w-[620px] w-full">
            <div className={styles.coursePropertiesWrap}>
              <div
                className="text-3xl md:text-4xl text-[#219bf1] text-center mb-3 md:mb-6 font-bold tex capitalize"
                style={{ fontFamily: '"Cormorant Upright", serif' }}
              >
                {courseSelectedToOrder?.name}
              </div>

              <Divider className="bg-[#252839] my-2 md:my-4" />
              <div className="flex mb-2 flex-wrap">
                <span className="mr-auto text-sm md:text-base">Giá ban đầu:</span>
                <span className="ml-auto font-bold text-sm md:text-base">{formatMoney(courseSelectedToOrder?.original_price)}</span>
              </div>
              <div className="flex mb-2 flex-wrap">
                <span className="mr-auto text-sm md:text-base">Giá hiện tại:</span>
                <span className="ml-auto font-bold text-sm md:text-base">{formatMoney(courseSelectedToOrder?.current_price)}</span>
              </div>
              <Divider className="bg-[#252839] my-2 md:my-4" />
              <div className="flex mb-2 flex-wrap">
                <span className="mr-auto text-sm md:text-base">Số tiền cần thanh toán:</span>
                <span className="ml-auto font-bold text-sm md:text-base">{formatMoney(courseSelectedToOrder?.current_price)}</span>
              </div>
              <div className="flex flex-col justify-center items-center gap-5 mt-6">
                <Button 
                  className={styles.payNow}
                  onClick={() => handleClickPay()}
                >
                  Thanh Toán
                </Button>
                <Link to="/" className="w-max text-sm md:text-base transition-all hover:text-[blue]">
                  <ArrowLeftOutlined className="mr-2" />
                  Thay đổi khóa tập
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 pb-6 md:pb-0 mt-[12%]">
          <Empty description={<span className="text-[#bdb7be]">Không tìm khóa tập !</span>} />
          <Link to="/" className={styles.backNow}>
            <ArrowLeftOutlined className="mr-2" />
            Quay Lại
          </Link>
        </div>
      )}
    </>
  );
}

export default StepOne;
