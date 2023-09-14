import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../utils/icons';

const { MdOutlineKeyboardArrowRight } = icons;
const SideBarItem = ({ category, fillterPrice, fillterAcreage, pageNumber }) => {
  const { prices } = useSelector((state) => state.price);
  const { acreages } = useSelector((state) => state.acreage);
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const location = useLocation();

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
  const memoizedCategories = useMemo(() => {
    return categories?.map((item) => ({
      code: item.code,
      title: item.value,
      path: item.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-'),
    }));
  }, [categories]);

  const formatItems = (items) => {
    if (!items) return [];
    return items.map((item) => ({
      code: item.code,
      title: item.value,
      path: item.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[\u0300-\u036f]/g, ''),
    }));
  };
  const memoizedAcreages = useMemo(() => formatItems(acreages), [acreages]);
  const memoizedPrices = useMemo(() => formatItems(prices), [prices]);

  const handleFilterPricePost = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        priceCode: code,
      }).toString(),
    });
  };
  const handleFilterAcreagePost = (code) => {
    const queryParams = {
      acreageCode: code,
    };
    const searchParams = new URLSearchParams(queryParams);
    navigate(`?${searchParams.toString()}`);
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
            <div
              key={item.code}
              className="flex items-center text-sm gap-3 border-b border-dashed border-gray-200 pb-1"
            >
              <MdOutlineKeyboardArrowRight size={18} />
              <Link className={'transition-all hover:text-red-500 hover:translate-x-2'} to={item?.path}>
                {item?.title}
              </Link>
            </div>
          ))}
      </div>
      {fillterPrice &&
        formatContent(memoizedPrices).map((item, index) => (
          <div key={index} className="">
            <div className=" flex items-center justify-around gap-2">
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <div
                  onClick={() => handleFilterPricePost(item.left.code)}
                  className="transition-all hover:text-red-500 hover:translate-x-2 cursor-pointer"
                >
                  {item.left.title}
                </div>
              </div>
              <div
                onClick={() => handleFilterPricePost(item.right.code)}
                className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1"
              >
                <MdOutlineKeyboardArrowRight size={18} />
                <div className="transition-all hover:text-red-500 hover:translate-x-2 cursor-pointer">
                  {item.right.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      {fillterAcreage &&
        formatContent(memoizedAcreages).map((item, index) => (
          <div key={index} className="">
            <div className=" flex items-center justify-around gap-2">
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <div
                  onClick={() => handleFilterAcreagePost(item.left.code, item.left.path)}
                  className="transition-all hover:text-red-500 hover:translate-x-2 cursor-pointer"
                >
                  {item.left.title}
                </div>
              </div>
              <div className="flex flex-1 items-center text-sm gap-1 border-b border-dashed border-gray-200 pb-1">
                <MdOutlineKeyboardArrowRight size={18} />
                <div
                  onClick={() => handleFilterAcreagePost(item.right.code)}
                  className="transition-all hover:text-red-500 hover:translate-x-2 cursor-pointer"
                >
                  {item.right.title}
                </div>
              </div>
            </div>
          </div>
        ))}
     
    </div>
  );
};

export default memo(SideBarItem);
