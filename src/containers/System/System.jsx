import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { toast } from 'react-toastify';
import { Header, Sidebar } from './index';

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    toast.warn('Bạn cần đăng nhập để tiếp tục truy cập!');
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="w-full flex items-center">
        <aside className="min-w-[320px] h-[calc(100vh-40px)] bg-gray-200 border-r border-gray-300 p-5 tl:hidden">
          <Sidebar />
        </aside>
        <div className="w-full h-[calc(100vh-40px)] overflow-y-scroll bg-white py-5 px-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
