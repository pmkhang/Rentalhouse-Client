import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../utils/constant';

const Navigation = () => {
  return (
    <div className="w-full bg-secondary1 text-white">
      <div className="max-w-[1100px] my-0 mx-auto px-5">
        <nav>
          <ul className="h-[40px] flex items-center">
            <li className="bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
            <li className="hover:bg-[#f73859] h-[40px] w-[120px] flex items-center justify-center cursor-pointer">
              <Link to={path.HOME}>Trang chủ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
