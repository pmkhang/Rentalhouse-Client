import React, { useEffect, useState, memo } from 'react';
import NavItem from '../../components/NavItem/NavItem';
import { apiGetCategories } from '../../services/category';

const Navigation = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.error === 0) {
        setCategories(response.data.response);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full text-white from-blue-400 via-blue-500 to-blue-600 bg-gradient-to-br">
      <div className="max-w-[1100px] my-0 mx-auto px-5">
        <nav className='h-[38px]'>
          <ul className=" flex items-center mb:hidden">
            <NavItem title={'Trang chủ'} path={'/'} />
            {categories?.length > 0 &&
              categories.map((item) => (
                <NavItem
                  key={item.code}
                  title={item.value}
                  path={item.value
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .split(' ')
                    .join('-')}
                />
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default memo(Navigation);
