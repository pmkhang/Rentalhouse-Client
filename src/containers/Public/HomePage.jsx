import React from 'react';
import { text } from '../../utils/constant';
import { Province } from '../../components/ProvinceBtn';
import { List } from './index';

const HomePage = () => {
  return (
    <div className="w-full min-h-fit flex flex-col gap-3">
      <div>
        <h2 className="text-[28px] font-bold">{text.HOME_TITLE}</h2>
        <p className="text-sm text-gray-700 ">{text.HOME_DESC}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4 mt-3">
        <div className="w-[70%] min-h-screen bg-white shadow-lg rounded-[15px]">
          <List />
        </div>
        <div className="w-[30%] min-h-screen bg-white shadow-lg rounded-[15px]">Sidebar</div>
      </div>
    </div>
  );
};

export default HomePage;
