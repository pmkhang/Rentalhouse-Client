import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';
import PostsSidebar from '../../components/PostsSidebar';
import SearchFilter from '../../components/SearchFIlter/SearchFilter';
import SideBarItem from '../../components/SideBarItem';
import { List } from './index';
import { useSearchParams, useLocation } from 'react-router-dom';
import { getPostsLimit } from '../../redux/action/postAction';

const SearchDetail = ({ text, homePage }) => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paramsArray = Array.from(searchParams.entries());
    const searchParamsObject = paramsArray.reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], value] : [value],
      };
    }, {});

    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, dispatch]);

  useEffect(() => {
    document.title = location?.state || 'Kết quả tìm kiếm';
  }, [location?.state]);
  return (
    <>
      <SearchFilter text={text} />
      <div className="w-full h-fit flex flex-col gap-3">
        <div className="w-full min-h-[80px] tl:h-fit">
          <h2 className="text-[28px] font-bold">{location?.state || 'Kết quả tìm kiếm!'}</h2>
          <p className="text-sm text-gray-700 ">{location?.state}</p>
        </div>
        <div className="w-full flex gap-4 mt-3">
          <div className="w-[70%] h-fit p-5 bg-white shadow-lg rounded-[15px] tl:w-full">
            <List posts={posts} />
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

export default memo(SearchDetail);
