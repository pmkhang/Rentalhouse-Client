import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Button from '../../components/Button';
import icons from '../../utils/icons';
import { path } from '../../utils/constant';

const { AiOutlinePlusCircle } = icons;
const Header = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate],
  );

  return (
    <div className="max-w-[1100px] mx-auto my-0 px-5 flex items-center justify-between">
      <img src={logo} alt="logo" className="w-[240px] h-[70px] object-contain cursor-pointer" onClick={goHome} />
      <div className="flex items-center gap-1">
        <small>Phongtro123.com xin chào! </small>
        <Button text={'Đăng ký'} textColor={'text-white'} bgColor={'bg-[#3961fb]'} onClick={() => goLogin(true)} />
        <Button text={'Đăng nhập'} textColor={'text-white'} bgColor={'bg-[#3961fb]'} onClick={() => goLogin(false)} />
        <Button
          text={'Đăng tin mới'}
          textColor={'text-white'}
          bgColor={'bg-secondary2'}
          IconRight={AiOutlinePlusCircle}
        />
      </div>
    </div>
  );
};

export default Header;
