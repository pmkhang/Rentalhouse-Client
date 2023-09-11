import React, { memo } from 'react';
import icons from '../../utils/icons';

const { MdOutlineKeyboardArrowRight } = icons;
const SideBarItem = ({ title, category, fillter }) => {
  return (
    <div className="w-full min-h-[300px] p-5 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold">Danh sách cho thuê</h3>
      {category && (
        <div className="flex items-center text-sm transition-all hover:text-red-500 cursor-pointer hover:translate-x-2">
          <MdOutlineKeyboardArrowRight />
          <span>Cho thuê category</span>
        </div>
      )}
      {fillter && (
        <ul>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
        </ul>
      )}
    </div>
  );
};

export default memo(SideBarItem);
