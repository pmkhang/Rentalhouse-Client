import React, { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import NavItem from '../../components/NavItem/NavItem';

const Navigation = () => {
  const [addFixed, setAddFixed] = useState(false);

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

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setAddFixed(true);
    } else {
      setAddFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`w-full text-white bg-blue-600 shadow-md ${addFixed && 'fixed top-0 right-0 left-0 z-10'}`}>
      <div className="max-w-[1100px] my-0 mx-auto px-5">
        <nav className="h-[38px]">
          <ul className="flex items-center mb:hidden">
            <NavItem title={'Trang chủ'} path={'/'} />
            {memoizedCategories?.length > 0 &&
              memoizedCategories.map((item) => <NavItem key={item.key} title={item.title} path={item.path} />)}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default memo(Navigation);
