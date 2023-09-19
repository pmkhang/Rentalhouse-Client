import React, { useState } from 'react';
import SelectorOverview from './SelectorOverview';
import { useSelector } from 'react-redux';
import Input from '../Input';
import icons from '../../utils/icons';
import { useEffect } from 'react';
import { apiUploadImages } from '../../services/post';

const { BsCamera2 } = icons;

const targerts = [
  {
    code: 'all',
    value: 'Tất cả',
  },
  {
    code: 'male',
    value: 'Nam',
  },
  {
    code: 'female',
    value: 'Nữ',
  },
];

const Overview = ({ setPayload }) => {
  const { categories } = useSelector((state) => state.category);
  const { userDataByID } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (userDataByID) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userName: userDataByID?.name,
        userPhone: userDataByID?.phone,
      }));
    }
  }, [userDataByID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFiles = async (e) => {
    e.stopPropagation();
    const files = e.target.files;
    const formData = new FormData();

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
  };

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      userName,
      userPhone,
      categoryCode,
      title,
      desc,
      target: genderCode,
      acreageNumber: acreage,
      priceNumber: price,
      images: JSON.stringify(images),
    }));
  }, [acreage, categoryCode, desc, genderCode, images, price, setPayload, title, userName, userPhone]);

  return (
    <div className="w-full min-h-[1500px] flex flex-col gap-3">
      <h2 className="font-semibold text-xl">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-3">
        <SelectorOverview
          label="Loại chuyên mục"
          options={categories}
          value={categoryCode || 'a'}
          setValue={setCategoryCode}
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
          />
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
        />
        <SelectorOverview
          label="Đối tượng cho thuê"
          options={targerts}
          value={genderCode || 'a'}
          setValue={setGenderCode}
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
            <span className="text-[100px] ">
              <BsCamera2 />
            </span>
            Thêm ảnh
          </label>
          <input type="file" id="file" hidden multiple onChange={handleFiles} />
        </div>
        {images.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Hình đã upload</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {images?.map((i, index) => (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[150px] h-[150px] object-contain border border-gray-400 shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
