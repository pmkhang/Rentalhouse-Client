import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Province } from '../../components/ProvinceBtn';
import { useSearchParams } from 'react-router-dom';
import SideBarItem from '../../components/SideBarItem';
import { getPostsLimit } from '../../redux/action/postAction';
import { getCategory } from '../../redux/action/categoryAction';
import { text } from '../../utils/constant';
import { List } from './index';

const HomePage = () => {
  const [params] = useSearchParams();
  const { posts, count } = useSelector((state) => state.post);
  const pageNumber = +params.get('page');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNaN(pageNumber)) {
      dispatch(getPostsLimit(pageNumber));
    }
  }, [dispatch, pageNumber]);

  return (
    <div className="w-full min-h-[3000px] flex flex-col gap-3">
      <div>
        <h2 className="text-[28px] font-bold">{text.HOME_TITLE}</h2>
        <p className="text-sm text-gray-700 ">{text.HOME_DESC}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4 mt-3">
        <div className="w-[70%] h-fit bg-white shadow-lg rounded-[15px] tl:w-full">
          <List posts={posts} count={count} number={pageNumber} />
        </div>
        <div className="w-[30%] h-fit flex flex-col items-center gap-3 tl:hidden">
          <SideBarItem category />
          <SideBarItem fillter />
          <SideBarItem fillter />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
