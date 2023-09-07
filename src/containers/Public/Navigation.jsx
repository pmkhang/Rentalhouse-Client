import React, { useEffect, useState } from 'react';
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
    <div className="w-full bg-secondary1 text-white">
      <div className="max-w-[1100px] my-0 mx-auto px-5">
        <nav>
          <ul className="h-[38px] flex items-center">
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

export default Navigation;
