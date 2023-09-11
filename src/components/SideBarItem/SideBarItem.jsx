import React, { memo } from 'react';
import icons from '../../utils/icons';
import { Link } from 'react-router-dom';

const { MdOutlineKeyboardArrowRight } = icons;
const SideBarItem = ({ category, fillterPrice, fillterAcreage, memoizedCategories }) => {
  return (
    <div className="w-full h-fit p-5 flex flex-col bg-white shadow-lg rounded-lg gap-3">
      {category && <h3 className="text-lg font-semibold">Danh mục cho thuê</h3>}
      {fillterPrice && <h3 className="text-lg font-semibold">Xem theo giá</h3>}
      {fillterAcreage && <h3 className="text-lg font-semibold">Xem theo diện tích</h3>}
      <div className="flex flex-col gap-5">
        {category &&
          memoizedCategories?.length > 0 &&
          memoizedCategories.map((item) => (
            <div key={item.key} className="flex items-center text-sm gap-3">
              <MdOutlineKeyboardArrowRight size={18} />
              <Link className={'transition-all hover:text-red-500 hover:translate-x-2'} to={item?.path}>
                {item?.title}
              </Link>
            </div>
          ))}
      </div>
      {fillterPrice && (
        <ul>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
          <li>Cho thuê căn hộ</li>
        </ul>
      )}
      {fillterAcreage && (
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
