import React, { useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { Province } from '../../components/ProvinceBtn';
import SideBarItem from '../../components/SideBarItem';
import { text } from '../../utils/constant';
import { List } from './index';
import { useDispatch } from 'react-redux';
import { getAcreages, getPrices } from '../../redux/action/priceAndArceage';
import { getCategory } from '../../redux/action/categoryAction';

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAcreages());
    dispatch(getPrices());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="w-full min-h-[3000px] flex flex-col gap-3">
      <div>
        <h2 className="text-[28px] font-bold">{text.HOME_TITLE}</h2>
        <p className="text-sm text-gray-700 ">{text.HOME_DESC}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4 mt-3">
        <div className="w-[70%] h-fit p-5 bg-white shadow-lg rounded-[15px] tl:w-full">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] h-fit flex flex-col items-center gap-3 tl:hidden">
          <SideBarItem category />
          <SideBarItem fillterPrice />
          <SideBarItem fillterAcreage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
