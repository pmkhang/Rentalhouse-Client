import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Button from '../../components/Button';
import icons from '../../utils/icons';
import { path } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/actions';
import { toast } from 'react-toastify';

const { AiOutlinePlusCircle, BiLogInCircle } = icons;
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
            <span className="mr-2">Phongtro123.com xin chào! </span>
            <Button
              text={'Đăng ký'}
              className={
                'text-white from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  focus:ring-cyan-300'
              }
              onClick={() => goToLoginOrRegister(true)}
            />
            <Button
              text={'Đăng nhập'}
              className={
                'text-white from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br  focus:ring-blue-300'
              }
              onClick={() => goToLoginOrRegister(false)}
            />
          </>
        )}

        {isLoggedIn && (
          <>
            <Button
              text={'Đăng tin mới'}
              className={
                'text-white font-bold from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-red-300 mr-5'
              }
              IconRight={AiOutlinePlusCircle}
            />
            <span className="mr-2 text-sm">
              Xin chào! <span className="font-bold text-base">Phạm Minh Khang</span>{' '}
            </span>
            <Button
              text={'Đăng xuất'}
              onClick={() => {
                dispatch(action.logout());
                toast.warn('Đã đăng xuất !');
              }}
              IconRight={BiLogInCircle}
              className={
                ' from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br  focus:ring-red-300'
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
