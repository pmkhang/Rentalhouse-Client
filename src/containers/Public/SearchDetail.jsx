import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import PostsSidebar from '../../components/PostsSidebar';
import SearchFilter from '../../components/SearchFIlter/SearchFilter';
import SideBarItem from '../../components/SideBarItem';
import { getPostsLimit } from '../../redux/action/postAction';
import { List } from './index';

const SearchDetail = ({ text, homePage }) => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchTitle = useSelector((state) => state.appState);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    const paramsArray = Array.from(searchParams.entries());
    const searchParamsObject = paramsArray.reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], value] : [value],
      };
    }, {});
    if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC'];
    if (sort === 0) searchParamsObject.order = ['star', 'DESC'];
    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, dispatch, sort]);

  useEffect(() => {
    document.title = searchTitle.searchTitle || 'Kết quả tìm kiếm';
  }, [searchTitle.searchTitle]);
  return (
    <>
      <SearchFilter text={text} />
      <div className="w-full h-fit flex flex-col gap-3">
        <div className="w-full min-h-[80px] tl:h-fit">
          <h2 className="text-[28px] font-bold">{searchTitle.searchTitle}</h2>
          <p className="text-sm text-gray-700 ">{searchTitle.searchTitle}</p>
        </div>
        <div className="w-full flex gap-4 mt-3">
          <div className="w-[70%] h-fit p-5 bg-white shadow-lg rounded-[15px] tl:w-full">
            <List posts={posts} sort={sort} setSort={setSort} />
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
