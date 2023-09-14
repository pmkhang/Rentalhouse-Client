import { useEffect } from 'react';
import Rental from './Rental';

const RentGround = () => {
  useEffect(() => {
    document.title = 'Cho thuê mặt bằng';
  }, []);
  return (
    <Rental
      title={'Cho Thuê Mặt Bằng, Văn Phòng Kinh Doanh, Giá Rẻ, Mới Nhất 2023'}
      desc={
        'Có 2.856 tin đăng cho thuê mặt bằng, văn phòng kinh doanh. Giá rẻ, gần chợ, trường học, tiện mở quán ăn, cafe. Đăng tin mặt bằng, văn phòng hiệu quả tại Phongtro123.com'
      }
      text={'Cho thuê mặt bằng'}
    />
  );
};

export default RentGround;
