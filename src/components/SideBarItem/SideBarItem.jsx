import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import icons from '../../utils/icons';

const { MdOutlineKeyboardArrowRight } = icons;
const SideBarItem = ({ category, fillterPrice, fillterAcreage, memoizedCategories }) => {
  const { prices, acreages } = useSelector((state) => ({
    prices: state.price.prices,
    acreages: state.acreage.acreages,
  }));

  const formatContent = (content) => {
    if (!Array.isArray(content)) {
      return [];
    }
    const formatContent = [];
    for (let i = 0; i < content.length; i += 2) {
      const left = content[i];
      const right = content[i + 1] !== undefined ? content[i + 1] : null;
      formatContent.push({ left, right });
    }
    return formatContent;
  };

  return (
    <div className="w-full h-fit p-5 flex flex-col bg-white shadow-lg rounded-lg gap-3">
      {category && <h3 className="text-lg font-semibold">Danh mục cho thuê</h3>}
      {fillterPrice && <h3 className="text-lg font-semibold">Xem theo giá</h3>}
      {fillterAcreage && <h3 className="text-lg font-semibold">Xem theo diện tích</h3>}
      <div className="flex flex-col gap-5">
        {category &&
          memoizedCategories?.length > 0 &&
          memoizedCategories.map((item) => (
            <div key={item.key} className="flex items-center text-sm gap-3 border-b border-dashed border-gray-200 pb-1">
              <MdOutlineKeyboardArrowRight size={18} />
              <Link className={'transition-all hover:text-red-500 hover:translate-x-2'} to={item?.path}>
                {item?.title}
              </Link>
            </div>
          ))}
      </div>
      {fillterPrice &&
        formatContent(prices).map((item, index) => (
          <div key={index} className="">
            <div className=" flex items-center justify-around gap-2">
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <Link to={''} className="transition-all hover:text-red-500 hover:translate-x-2">
                  {item.left.value}
                </Link>
              </div>
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <Link to="" className="transition-all hover:text-red-500 hover:translate-x-2">
                  {item.right.value}
                </Link>
              </div>
            </div>
          </div>
        ))}
      {fillterAcreage &&
        formatContent(acreages).map((item, index) => (
          <div key={index} className="">
            <div className=" flex items-center justify-around gap-2">
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <Link to={''} className="transition-all hover:text-red-500 hover:translate-x-2">
                  {item.left.value}
                </Link>
              </div>
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <Link to="" className="transition-all hover:text-red-500 hover:translate-x-2">
                  {item.right.value}
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default memo(SideBarItem);
