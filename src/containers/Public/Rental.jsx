import React, { memo, useEffect, useMemo, useState } from 'react';
import Pagination from '../../components/Pagination';
import PostsSidebar from '../../components/PostsSidebar';
import { Province } from '../../components/ProvinceBtn';
import SearchFilter from '../../components/SearchFIlter/SearchFilter';
import SideBarItem from '../../components/SideBarItem';
import { List } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPostsLimit } from '../../redux/action/postAction';

const Rental = ({ title, desc, text, homePage }) => {
  const { categories } = useSelector((state) => state.category);
  const { posts } = useSelector((state) => state.post);
  const [categoryCode, setCategoryCode] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    const category = memoizedCategories?.find((i) => `/${i.path}` === location.pathname);
    if (category) {
      setCategoryCode(category.key);
    }
  }, [location.pathname, memoizedCategories]);

  useEffect(() => {
    const paramsArray = Array.from(searchParams.entries());
    const searchParamsObject = paramsArray.reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], value] : [value],
      };
    }, {});
    if (categoryCode) {
      searchParamsObject.categoryCode = categoryCode;
      dispatch(getPostsLimit(searchParamsObject));
    } else {
      dispatch(getPostsLimit(searchParamsObject));
    }
  }, [searchParams, categoryCode, dispatch]);

  return (
    <>
      <SearchFilter text={text} />
      <div className="w-full h-fit flex flex-col gap-3">
        <div className="w-full min-h-[85px] tl:min-h-[200px]">
          <h2 className="text-[28px] font-bold">{title}</h2>
          <p className="text-sm text-gray-700 ">{desc}</p>
        </div>
        <Province />
        <div className="w-full flex gap-4 mt-3">
          <div className="w-[70%] h-fit p-5 bg-white shadow-lg rounded-[15px] tl:w-full">
            <List posts={posts} categoryCode={categoryCode} />
            <Pagination />
          </div>
          <div className="w-[30%] h-fit flex flex-col items-center gap-3 tl:hidden">
            {homePage && <SideBarItem category />}
            <SideBarItem fillterPrice />
            <SideBarItem fillterAcreage />
            <PostsSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Rental);
