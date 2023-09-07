import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Button from '../../components/Button';
import icons from '../../utils/icons';
import { path } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/actions';

const { AiOutlinePlusCircle } = icons;
const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLoginOrRegister = useCallback(
    (flag) => {
      const destination = flag ? path.REGISTER : path.LOGIN;
      navigate(destination, { state: { flag } });
    },
    [navigate],
  );

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="max-w-[1100px] mx-auto my-0 px-5 flex items-center justify-between">
      <img src={logo} alt="logo" className="w-[240px] h-[70px] object-contain cursor-pointer" onClick={goHome} />
      <div className="flex items-center gap-1">
        {!isLoggedIn && (
          <>
            <span>Phongtro123.com xin chào! </span>
            <Button
              text={'Đăng ký'}
              textColor={'text-white'}
              bgColor={'bg-[#3961fb]'}
              onClick={() => goToLoginOrRegister(true)}
            />
            <Button
              text={'Đăng nhập'}
              textColor={'text-white'}
              bgColor={'bg-[#3961fb]'}
              onClick={() => goToLoginOrRegister(false)}
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <span>Xin chào! TÊN </span>
            <Button
              text={'Đăng xuất'}
              textColor={'text-white'}
              bgColor={'bg-red-700'}
              onClick={() => dispatch(action.logout())}
            />
          </>
        )}
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
