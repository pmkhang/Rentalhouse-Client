import React, { useEffect } from 'react';
import Rental from './Rental';

const HomePage = () => {
  useEffect(() => {
    document.title = 'RentalHouse - Trang chủ';
  }, []);

  return (
    <Rental
      title={'Kênh thông tin Phòng Trọ số 1 Việt Nam'}
      desc={
        'Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.'
      }
      
      homePage
    />
  );
};

export default HomePage;
