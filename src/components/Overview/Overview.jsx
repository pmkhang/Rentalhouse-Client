import React, { useState } from 'react';
import SelectorOverview from './SelectorOverview';
import { useSelector } from 'react-redux';
import Input from '../Input';
import icons from '../../utils/icons';
import { useEffect } from 'react';
import { apiUploadImages } from '../../services/post';
import { ColorRing } from 'react-loader-spinner';

const { BsCamera2, FaTimes } = icons;

const targerts = [
  {
    code: 'Tất cả',
    value: 'Tất cả',
  },
  {
    code: 'Nam',
    value: 'Nam',
  },
  {
    code: 'Nữ',
    value: 'Nữ',
  },
];

const Overview = ({ setPayload, setInvalidField, invalidField }) => {
  const { categories } = useSelector((state) => state.category);
  const { userDataByID } = useSelector((state) => state.user);
  const [isLoading, setIsloading] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    title: '',
    desc: '',
    price: '',
    acreage: '',
    images: [],
  });

  const { userName, userPhone, title, desc, price, acreage, images } = formData;
  const [genderCode, setGenderCode] = useState('');
  const [categoryCode, setCategoryCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (userDataByID) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userName: userDataByID?.name,
        userPhone: userDataByID?.phone,
      }));
    }
  }, [userDataByID]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    const files = e.target.files;
    const formData = new FormData();
    setIsloading(true);
    for (let i of files) {
      formData.append('file', i);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
      try {
        const response = await apiUploadImages(formData);
        if (response.status === 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, response?.data?.secure_url],
          }));
        } else {
          console.error('Upload failed:', response?.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    setIsloading(false);
  };

  const handleDelImage = (i) => {
    const indexToRemove = formData.images.indexOf(i);
    if (indexToRemove !== -1) {
      const updatedImages = [...formData.images];
      updatedImages.splice(indexToRemove, 1);

      setFormData((prevFormData) => ({
        ...prevFormData,
        images: updatedImages,
      }));
    }
  };

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      userID: userDataByID?.id,
      categoryCode,
      categoryName: categories.find((i) => i?.code === categoryCode)?.value || '',
      title,
      desc,
      target: genderCode || '',
      acreageNumber: +acreage || '',
      priceNumber: price / 10 ** 6 || '',
      images: JSON.stringify(images),
    }));
  }, [acreage, categories, categoryCode, desc, genderCode, images, price, setPayload, title, userDataByID?.id]);

  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <h2 className="font-semibold text-xl">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-3">
        <SelectorOverview
          label="Loại chuyên mục"
          options={categories}
          value={categoryCode || 'a'}
          setValue={setCategoryCode}
          onFocus={() => setInvalidField([])}
          invalidField={invalidField}
          type="categoryCode"
        />
        <Input
          type="text"
          label="Tiêu đề"
          labelStyle={'font-semibold'}
          id="title"
          inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
          name="title"
          value={title}
          onChange={handleInputChange}
          invalidField={invalidField}
          onFocus={() => setInvalidField([])}
          typeName="title"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-base block font-semibold text-gray-900 cursor-pointer">
            Nội dung mô tả
          </label>
          <textarea
            id="content"
            className="w-full min-h-[200px] p-3 outline-none border border-gray-300 rounded-md focus:border-blue-400"
            name="desc"
            value={desc}
            onChange={handleInputChange}
            onFocus={() => setInvalidField([])}
          />
          {invalidField && invalidField?.some((i) => i?.name === 'desc') ? (
            <span className="text-red-500 text-xs">{invalidField?.find((i) => i?.name === 'desc')?.message}</span>
          ) : (
            ''
          )}
        </div>
        <Input
          type="text"
          inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
          readOnly
          label="Thông tin liên hệ"
          id="info"
          labelStyle={'font-semibold'}
          name="userName"
          value={userName || ''}
        />
        <Input
          type="text"
          inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
          readOnly
          label="Số điện thoại"
          id="phone"
          labelStyle={'font-semibold'}
          name="userPhone"
          value={userPhone || ''}
        />
        <div className="w-1/2 tl:w-full">
          <Input
            type="text"
            inputStyle={'py-2 bg-white rounded-r-none border-r-0 focus:border focus:border-blue-400'}
            label="Giá cho thuê"
            id="price"
            labelStyle={'font-semibold'}
            name="price"
            decs1={'Đồng/tháng'}
            decs2={'Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'}
            value={price}
            onChange={handleInputChange}
            invalidField={invalidField}
            onFocus={() => setInvalidField([])}
            typeName="priceNumber"
          />
          <Input
            type="number"
            inputStyle={'py-2 bg-white rounded-r-none border-r-0  focus:border focus:border-blue-400'}
            label="Diện tích"
            id="acreage"
            labelStyle={'font-semibold'}
            name="acreage"
            decs1={'m²'}
            value={acreage}
            onChange={handleInputChange}
            invalidField={invalidField}
            onFocus={() => setInvalidField([])}
            typeName="acreageNumber"
          />
        </div>
        <SelectorOverview
          label="Đối tượng cho thuê"
          options={targerts}
          value={genderCode || 'a'}
          setValue={setGenderCode}
          onFocus={() => setInvalidField([])}
          invalidField={invalidField}
          type="target"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Hình Ảnh</h2>
        <span className="text-sm">Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</span>
        <div className="w-full my-4">
          <label
            htmlFor="file"
            className="w-full min-h-[200px] text-gray-400 flex flex-col items-center justify-center border-4 border-dashed border-gray-400 rounded-lg shadow-md cursor-pointer transition-all hover:bg-gray-100"
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
              />
            ) : (
              <span className="flex flex-col items-center">
                <BsCamera2 size={120} />
                Thêm ảnh
              </span>
            )}
          </label>
          <input type="file" id="file" hidden multiple onChange={handleFiles} />
        </div>
        {images.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Hình đã upload</h3>
            <div className="flex flex-wrap gap-6 items-center">
              {images?.map((i, index) => (
                <div
                  key={index}
                  className="relative w-[235px] h-[150px] border border-gray-400 rounded-lg shadow-md p-2"
                >
                  <img key={index} src={i} alt="preview" className="w-full h-full object-contain " />
                  <span
                    title="Xoá ảnh"
                    className="absolute top-[-12px] right-[-12px] text-[28px] bg-white border border-gray-400 shadow-md rounded-sm cursor-pointer transition-all hover:scale-125"
                    onClick={() => handleDelImage(i)}
                  >
                    <FaTimes />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
