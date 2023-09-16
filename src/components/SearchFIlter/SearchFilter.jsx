import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import Button from '../Button';
import SearchModal from './SearchModal';

const { AiOutlineSearch, FaHotel, ImLocation2, ImPriceTags, FaRulerCombined } = icons;

const SearchFilter = ({ text }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [textBtn, setTextBtn] = useState(text);
  const [textBtn1, setTextBtn1] = useState('Toàn quốc');
  const [textPrice, setTextPrice] = useState('Chọn giá');
  const [textAcreage, setTextAcreage] = useState('Chọn diện tích');
  const [queries, setQueries] = useState({});

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

  const handleSubmit = (query) => {
    
  };
  console.log(queries);

  return (
    <div className="w-full mx-auto my-0 mt-3">
      <div className=" w-full h-fit p-[8px] bg-[#febb02] rounded-lg flex items-center gap-2 shadow-md tl:flex-col tl:gap-3">
        <Button
          text={textBtn}
          textStyle={`font-medium text-sm text-gray-600 tl:justify-start`}
          fullWidth
          IconLeft={FaHotel}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(categories, 'Chọn bất loại bất động sản', 'categoryCode')}
        />
        <Button
          text={textBtn1}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start`}
          fullWidth
          IconLeft={ImLocation2}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(provinces, 'Chọn bất vị trí', 'provinceCode')}
        />
        <Button
          text={textPrice}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start`}
          fullWidth
          IconLeft={ImPriceTags}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(prices, 'Chọn giá', 'priceCode')}
        />
        <Button
          text={textAcreage}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start`}
          fullWidth
          IconLeft={FaRulerCombined}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(acreages, 'Chọn diện tích', 'acreageCode')}
        />
        <Button
          text={'Tìm kiếm'}
          textStyle={`font-medium text-sm text-white tl:justify-center `}
          fullWidth
          IconLeft={AiOutlineSearch}
          className={'bg-blue-600 text-white py-[8px] focus:ring-blue-300 hover:bg-blue-500 '}
        />
      </div>
      {showModal && (
        <SearchModal
          content={content}
          name={name}
          title={title}
          setShowModal={setShowModal}
          setTextBtn={setTextBtn}
          setTextBtn1={setTextBtn1}
          setTextPrice={setTextPrice}
          setTextAcreage={setTextAcreage}
          setQueries={setQueries}
        />
      )}
    </div>
  );
};

export default SearchFilter;
