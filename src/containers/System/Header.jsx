import React, { useMemo } from 'react';
// import logo from '../../Assets/logoRentalHouse-white.png';
import { Navigation } from '../Public';
import { useSelector } from 'react-redux';
import NavItem from '../../components/NavItem/NavItem';
import { NavLink } from 'react-router-dom';

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
    <div className="w-full h-[40px] flex items-center bg-blue-800 shadow-lg">
      <div className="w-[320px] px-5">
        <h3 className="text-white font-semibold text-2xl tl:text-lg">Rental House</h3>
      </div>
      <div className="flex items-center gap-5 px-5">
        <NavLink to="/" className={'text-white hover:text-orange-400'}>
          Trang chủ
        </NavLink>
        {memoizedCategories?.map((i) => (
          <NavLink key={i?.key} to={`/${i?.path}`} className={'text-white hover:text-orange-400 '}>
            {i?.title}
          </NavLink>
        ))}
      </div>
      
    </div>
  );
};

export default Header;
