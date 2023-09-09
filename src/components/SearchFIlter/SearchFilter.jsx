import React, { useState } from 'react';
import Button from '../Button';
import icons from '../../utils/icons';
import SearchModal from './SearchModal';

const { AiOutlineSearch, FaHotel, ImLocation2, ImPriceTags, FaRulerCombined } = icons;

const SearchFilter = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-[1100px] mx-auto my-0 px-5 mt-3">
      <div className=" w-full h-fit p-[8px] bg-[#febb02] rounded-lg flex items-center gap-1 shadow-md tl:flex-col tl:gap-3">
        <Button
          text={'Phòng trọ, nhà trọ'}
          textStyle={`font-medium text-sm text-gray-600 `}
          fullWidth
          IconLeft={FaHotel}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => setShowModal(true)}
        />
        <Button
          text={'Toàn quốc'}
          textStyle={`font-medium text-sm text-gray-400`}
          fullWidth
          IconLeft={ImLocation2}
          className={'bg-white py-[8px] focus:ring-gray-300'}
        />
        <Button
          text={'Chọn giá'}
          textStyle={`font-medium text-sm text-gray-400`}
          fullWidth
          IconLeft={ImPriceTags}
          className={'bg-white py-[8px] focus:ring-gray-300'}
        />
        <Button
          text={'Chọn diện tích'}
          textStyle={`font-medium text-sm text-gray-400`}
          fullWidth
          IconLeft={FaRulerCombined}
          className={'bg-white py-[8px] focus:ring-gray-300'}
        />
        <Button
          text={'Tìm kiếm'}
          textStyle={`font-medium text-sm text-white tl:justify-center`}
          fullWidth
          IconLeft={AiOutlineSearch}
          className={'bg-blue-600 text-white py-[8px] focus:ring-blue-300 hover:bg-blue-500 '}
        />
      </div>
      <SearchModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default SearchFilter;
