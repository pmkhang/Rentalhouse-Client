import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoRentalHouse from '../../Assets/logoRentalHouse.png';
import Button from '../../components/Button';
import icons from '../../utils/icons';
import { path } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/action/authAction';
import { toast } from 'react-toastify';

const { AiOutlinePlusCircle, BiLogInCircle } = icons;
const Header = () => {
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, id } = useSelector((state) => state.auth);
  const { usersData } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      const userName = usersData.find((i) => i.id === id)?.name;
      setUserName(userName);
    }
  }, [id, isLoggedIn, usersData]);

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
    <div id="header" className="max-w-[1100px] mx-auto my-0 px-5 flex items-center justify-between ">
      <img
        src={logoRentalHouse}
        alt="logo"
        className=" h-[70px] object-contain cursor-pointer py-2"
        onClick={goHome}
      />
      <div className="flex items-center gap-1 mb:hidden">
        {!isLoggedIn && (
          <>
            <span className="mr-2">RentalHouse xin chào! </span>
            <Button
              text={'Đăng ký'}
              className={'text-white bg-orange-500 hover:bg-orange-400  focus:ring-orange-300'}
              onClick={() => goToLoginOrRegister(true)}
            />
            <Button
              text={'Đăng nhập'}
              className={'text-white bg-blue-600 hover:bg-blue-500  focus:ring-blue-300'}
              onClick={() => goToLoginOrRegister(false)}
            />
          </>
        )}
        {isLoggedIn && (
          <div className="flex items-center mb:hidden">
            <Button
              text={'Đăng tin mới'}
              className={'text-white font-bold bg-green-600 hover:bg-green-500 focus:ring-green-300 mr-5'}
              IconRight={AiOutlinePlusCircle}
            />
            <span className="mr-2 text-sm">
              Xin chào! <span className="font-bold text-base">{userName}</span>{' '}
            </span>
            <Button
              text={'Đăng xuất'}
              onClick={() => {
                dispatch(logoutUser());
                toast.warn('Đã đăng xuất !');
              }}
              IconRight={BiLogInCircle}
              className={' bg-orange-500  hover:bg-orange-400 focus:ring-orange-300'}
              textStyle={'font-medium text-white'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
