import React, { useState } from 'react';
import Button from '../Button';
import icons from '../../utils/icons';
import SearchModal from './SearchModal';
import { useSelector } from 'react-redux';

const { AiOutlineSearch, FaHotel, ImLocation2, ImPriceTags, FaRulerCombined } = icons;

const SearchFilter = ({ text }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const { provinces } = useSelector((state) => state.province);
  const { prices } = useSelector((state) => state.price);
  const { acreages } = useSelector((state) => state.acreage);
  const { categories } = useSelector((state) => state.category);

  const handleShowModal = (content, title, name) => {
    setShowModal(true);
    setContent(content);
    setTitle(title);
    setName(name);
  };

  return (
    <div className="w-full mx-auto my-0 mt-3">
      <div className=" w-full h-fit p-[8px] bg-[#febb02] rounded-lg flex items-center gap-1 shadow-md tl:flex-col tl:gap-3">
        <Button
          text={text}
          textStyle={`font-medium text-sm text-gray-600 `}
          fullWidth
          IconLeft={FaHotel}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(categories, 'Chọn bất loại bất động sản', 'category')}
        />
        <Button
          text={'Toàn quốc'}
          textStyle={`font-medium text-sm text-gray-400`}
          fullWidth
          IconLeft={ImLocation2}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(provinces, 'Chọn bất vị trí', 'province')}
        />
        <Button
          text={'Chọn giá'}
          textStyle={`font-medium text-sm text-gray-400`}
          fullWidth
          IconLeft={ImPriceTags}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(prices, 'Chọn giá', 'price')}
        />
        <Button
          text={'Chọn diện tích'}
          textStyle={`font-medium text-sm text-gray-400`}
          fullWidth
          IconLeft={FaRulerCombined}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(acreages, 'Chọn diện tích', 'acreage')}
        />
        <Button
          text={'Tìm kiếm'}
          textStyle={`font-medium text-sm text-white tl:justify-center`}
          fullWidth
          IconLeft={AiOutlineSearch}
          className={'bg-blue-600 text-white py-[8px] focus:ring-blue-300 hover:bg-blue-500 '}
        />
      </div>
      {showModal && <SearchModal content={content} name={name} title={title} setShowModal={setShowModal} />}
    </div>
  );
};

export default SearchFilter;
