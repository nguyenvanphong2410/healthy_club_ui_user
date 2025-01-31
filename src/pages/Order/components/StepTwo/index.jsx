import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { Button } from 'antd';
import { formatMoney } from '@/utils/helper';
import { useNavigate } from 'react-router-dom';

function StepTwo() {
  const linkQR = useSelector((state) => state.order.linkQR);
  const navigate = useNavigate();
  const handleGotoHome = () => {
    navigate('/')
  }
  
  return (
    <>
      <div className={styles.payContainer}>
        <div className={styles.payWrap}>
          {linkQR.qr_url ? (
            <div className={styles.qrWrap}>
              <div className={styles.qrWrap}>
                <img className={styles.imgQr} src={linkQR.qr_url} alt="img-qr" />
              </div>
              <div className={styles.btnWrap}>
                {linkQR.qr_url ? (
                  <div className={styles.remindWrap}>
                    <p className={styles.textRemind}>Vui lòng quét mã để thanh toán</p>
                    <p className={styles.gt}>** Hãy quét mã và sau đó nhấn 'Hoàn thành' để tiếp tục tham gia với những khóa tập khác</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.headerWrap}>
                      <p className={styles.textInfo}>Thông tin thanh toán</p>
                    </div>
                    <p className={styles.textRemindPay}>Vui lòng thanh toán</p>
                  </>
                )}
                <Button className={styles.btn} onClick={handleGotoHome}>Hoàn Thành</Button>
              </div>
            </div>
          ) : (
            <div className={styles.infoPayWrap}>
              <div className={styles.itemInfo}>
                <p className={styles.label}>Tên người nhận</p>
                <p className={styles.info}>{linkQR.name}</p>
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.label}>Tên ngân hàng</p>
                <p className={styles.info}>{linkQR.name_bank}</p>
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.label}>Số tài khoản</p>
                <p className={styles.info}>{linkQR.number_bank}</p>
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.label}>Số tiền</p>
                <p className={styles.info}>{formatMoney(linkQR.amount)} VND</p>
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.label}>Nội dung</p>
                <p className={styles.info}>{linkQR.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StepTwo;
