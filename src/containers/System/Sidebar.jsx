import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../../redux/action/authAction';
import icons from '../../utils/icons';
import { menuSidebar } from '../../utils/menuSidebar';

const { BiLogInCircle } = icons;
const navNotActive = 'w-full flex items-center gap-3 transition-all hover:text-orange-500 hover:font-semibold';
const navActive = 'w-full flex items-center gap-3 transition-all text-orange-500 font-semibold';

const Sidebar = () => {
  const { userDataByID } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[350px] flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <img
            src={
              userDataByID?.avatar ||
              'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
            }
            alt="avatar"
            className="w-[50px] h-[50px] object-contain shadow-md rounded-full border border-gray-400"
          />
          <div className="flex flex-col">
            <span className="font-bold">{userDataByID?.name}</span>
            <span>{userDataByID?.phone}</span>
          </div>
        </div>
        <span>
          Mã thành viên : <span className="font-bold">{userDataByID?.id}</span>
        </span>
      </div>
      <ul className="flex flex-col items-center gap-4">
        {menuSidebar?.map((i) => (
          <li key={i?.id} className="w-full block">
            <NavLink to={i?.path} className={({ isActive }) => (isActive ? navActive : navNotActive)}>
              <span className="text-lg">{i?.icon}</span>
              {i?.text}
            </NavLink>
          </li>
        ))}
        <li className="w-full block">
          <span
            onClick={() => {
              dispatch(logoutUser());
              navigate('/');
              toast.warn('Đã đăng xuất !');
            }}
            className="w-full flex items-center gap-3 cursor-pointer transition-all hover:text-orange-500 hover:translate-x-3"
          >
            <span>
              <BiLogInCircle />
            </span>
            Đăng xuất
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
