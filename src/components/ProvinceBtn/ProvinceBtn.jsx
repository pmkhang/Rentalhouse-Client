import React, { memo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setSearchTitle } from '../../redux/Slice/appStateSlice';

const ProvinceBtn = ({ name, img, provinceCode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    console.log(provinceCode);
    navigate({
      pathname: `/${path.SEARCH_DETAIL}`,
      search: createSearchParams({ provinceCode, categoryCode: 'chothuephongtro' }).toString(),
    });
    dispatch(setSearchTitle(`Cho thuê ${name}, Phòng trọ giá rẻ 2023`));
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex flex-col gap-1 items-center bg-white rounded-md shadow-md cursor-pointer transition-all hover:shadow-lg hover:translate-y-[-4px] text-blue-700 hover:text-red-500"
    >
      <img src={img} alt={name} className="w-[220px] h-[110px] object-cover rounded-t-md" />
      <span className="p-3 text-sm font-bold drop-shadow-md">{name}</span>
    </div>
  );
};

export default memo(ProvinceBtn);
