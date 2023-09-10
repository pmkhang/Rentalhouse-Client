import React, { useEffect, useState } from 'react';
import icons from '../../utils/icons';
import { Link } from 'react-scroll';

const { IoIosArrowUp } = icons;
const RollTop = () => {
  const [showBtnScrollTop, setShowBtnScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowBtnScrollTop(true);
    } else {
      setShowBtnScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {showBtnScrollTop && (
        <Link
          to="header"
          smooth={true}
          duration={500}
          className="fixed flex items-center justify-center bottom-3 right-5 z-50 w-10 h-10 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-400"
        >
          <IoIosArrowUp size={20} color={'white'} />
        </Link>
      )}
    </>
  );
};

export default RollTop;
