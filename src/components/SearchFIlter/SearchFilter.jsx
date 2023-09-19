import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';
import Button from '../Button';
import SearchModal from './SearchModal';
import { setSearchTitle } from '../../redux/Slice/appStateSlice';

const { AiOutlineSearch, FaHotel, ImLocation2, ImPriceTags, FaRulerCombined } = icons;

const SearchFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [textCategody, setTextCategody] = useState();
  const [textCity, setTextCity] = useState();
  const [textPrice, setTextPrice] = useState();
  const [textAcreage, setTextAcreage] = useState();
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});

  const { provinces } = useSelector((state) => state.province);
  const { prices } = useSelector((state) => state.price);
  const { acreages } = useSelector((state) => state.acreage);
  const { categories } = useSelector((state) => state.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowModal = (content, title, name) => {
    setShowModal(true);
    setContent(content);
    setTitle(title);
    setName(name);
  };

  const handleSubmit = () => {
    const titleSearch = `${queries.categoryCode ? textCategody : 'Cho thuê tất cả'} ${
      queries.provinceCode ? ' - Tại ' + textCity : ''
    } ${queries.priceCode || queries.priceNumber ? ' - ' + textPrice : ''} ${
      queries.acreageCode || queries.acreageNumber ? ' - ' + textAcreage : ''
    } `;
    dispatch(setSearchTitle(titleSearch));
    navigate({
      pathname: `/${path.SEARCH_DETAIL}`,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <div className="w-full mx-auto my-0 mt-3">
      <div className=" w-full h-fit p-[8px] bg-orange-400 rounded-lg flex items-center gap-2 shadow-md tl:flex-col tl:gap-3">
        <Button
          text={textCategody || 'Chọn loại Bất Động Sản'}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start ${textCategody && 'text-gray-600'}`}
          fullWidth
          IconLeft={FaHotel}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(categories, 'Chọn loại bất động sản', 'categoryCode')}
        />
        <Button
          text={textCity || 'Chọn Vị trí'}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start ${textCity && 'text-gray-600'}`}
          fullWidth
          IconLeft={ImLocation2}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(provinces, 'Chọn bất vị trí', 'provinceCode')}
        />
        <Button
          text={textPrice || 'Chọn giá'}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start ${textPrice && 'text-gray-600'}`}
          fullWidth
          IconLeft={ImPriceTags}
          className={'bg-white py-[8px] focus:ring-gray-300'}
          onClick={() => handleShowModal(prices, 'Chọn giá', 'priceCode')}
        />
        <Button
          text={textAcreage || 'Chọn diện tích'}
          textStyle={`font-medium text-sm text-gray-400 tl:justify-start ${textAcreage && 'text-gray-600'} `}
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
          onClick={() => handleSubmit()}
        />
      </div>
      {showModal && (
        <SearchModal
          content={content}
          name={name}
          title={title}
          setShowModal={setShowModal}
          setTextCategody={setTextCategody}
          setTextCity={setTextCity}
          setTextPrice={setTextPrice}
          setTextAcreage={setTextAcreage}
          setQueries={setQueries}
          queries={queries}
          setArrMinMax={setArrMinMax}
          arrMinMax={arrMinMax}
        />
      )}
    </div>
  );
};

export default SearchFilter;
