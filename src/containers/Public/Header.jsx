import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoRentalHouse from '../../Assets/logoRentalHouse.png';
import Button from '../../components/Button';
import { logoutUser } from '../../redux/action/authAction';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';
import { menuManager } from '../../utils/menuManager';

const { BsClipboardPlus, BsChevronDoubleDown, BiLogInCircle } = icons;
const Header = ({ userName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showDropDown, setShowDropDown] = useState(false);

  const goToLoginOrRegister = useCallback(
    (flag) => {
      const destination = flag ? path.REGISTER : path.LOGIN;
      navigate(destination, { state: { flag } });
    },
    [navigate],
  );

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowDropDown(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div id="header" className="max-w-[1100px] mx-auto my-0 flex items-center justify-between">
      <img
        src={logoRentalHouse}
        alt="logo"
        className=" h-[70px] object-contain cursor-pointer py-2 ml-5"
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
          <div className="flex items-center mb:hidden gap-2">
            <span className="text-sm">
              Xin chào! <span className="font-bold text-base">{userName}</span>{' '}
            </span>
            <div className="relative">
              <Button
                text={'Quản lý tài khoản'}
                onClick={() => {
                  // dispatch(logoutUser());
                  // toast.warn('Đã đăng xuất !');
                  setShowDropDown(!showDropDown);
                }}
                IconRight={BsChevronDoubleDown}
                className={' bg-orange-500  hover:bg-orange-400 focus:ring-orange-200'}
                textStyle={'font-semibold text-white'}
              />
              {showDropDown && (
                <div className="absolute bg-white top-full left-0 right-0 mt-1 shadow-md rounded-lg z-20">
                  <ul className="w-full flex flex-col justify-between py-3 gap-4">
                    {menuManager?.map((i) => (
                      <li key={i?.id} className="w-full block ">
                        <Link
                          to={i?.path}
                          className="w-full flex items-center gap-3 px-3 text-blue-500 font-semibold hover:text-orange-500"
                          onClick={() => setShowDropDown(false)}
                        >
                          <span className="text-lg">{i?.icon}</span>
                          {i?.text}
                        </Link>
                      </li>
                    ))}
                    <li className="w-full block px-3">
                      <Button
                        text={'Đăng xuất'}
                        fullWidth
                        className={'bg-red-500 py-[4px] hover:bg-red-400'}
                        textStyle={'text-white font-semibold'}
                        IconRight={BiLogInCircle}
                        onClick={() => {
                          setShowDropDown(false);
                          dispatch(logoutUser());
                          toast.warn('Đã đăng xuất !');
                        }}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Button
              text={'Đăng tin mới'}
              className={'text-white font-bold bg-green-600 hover:bg-green-500 focus:ring-green-300 mr-5'}
              IconLeft={BsClipboardPlus}
              onClick={() => {
                navigate('/quan-ly/dang-tin-cho-thue');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
