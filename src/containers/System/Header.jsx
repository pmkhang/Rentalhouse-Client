import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { path } from '../../utils/constant';

const Header = () => {
  const { categories } = useSelector((state) => state.category);

  const memoizedCategories = useMemo(() => {
    return categories?.map((item) => ({
      key: item.code,
      title: item.value,
      path: item.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-'),
    }));
  }, [categories]);

  return (
    <div className="w-full h-[40px] flex items-center bg-blue-800 shadow-lg tl:justify-between">
      <div className="w-[320px] px-5 tl:w-auto">
        <NavLink to="/" className="w-full text-white font-semibold text-2xl hover:text-orange-500 tl:text-lg">
          Rental House
        </NavLink>
      </div>
      <div className="flex items-center gap-5 px-5 mb:hidden">
        <NavLink to="/" className={'text-white font-semibold hover:text-orange-400'}>
          Trang chủ
        </NavLink>
        {memoizedCategories?.map((i) => (
          <NavLink key={i?.key} to={`/${i?.path}`} className={'text-white font-semibold hover:text-orange-400 '}>
            {i?.title.replace('Cho', '').trim().charAt(0).toUpperCase() + i?.title.replace('Cho', '').trim().slice(1)}
          </NavLink>
        ))}
        <NavLink to={`/${path.CONTACT}`} className={'text-white font-semibold hover:text-orange-400'}>
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
