import React, { memo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderImage = ({ images }) => {
  const [dataImages, setDataImages] = useState([]);

  useEffect(() => {
    if (images) {
      setDataImages(JSON.parse(images));
    }
  }, [images]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // fade: true,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {dataImages?.map((i, index) => (
          <div key={index} className="w-full h-[480px] flex items-center justify-center bg-gray-800 shadow-md">
            <img src={i || ''} alt="pictureRental" className="w-full h-full object-contain" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(SliderImage);
