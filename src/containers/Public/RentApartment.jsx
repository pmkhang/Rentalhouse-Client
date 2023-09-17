import { useEffect } from 'react';
import Rental from './Rental';

const RentApartment = () => {
  useEffect(() => {
    document.title = 'Cho thuê căn hộ';
  }, []);

  return (
    <Rental
      title={'Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất 2023'}
      desc={
        'Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.'
      }
    />
  );
};

export default RentApartment;
