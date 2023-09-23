import React, { useEffect, useState } from 'react';
import { BsCamera2 } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { ColorRing } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { apiUploadImages } from '../../services/post';
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../../services/province';
import SelectorAddress from '../Address/SelectorAddress';
import Input from '../Input';
import SelectorOverview from '../Overview/SelectorOverview';
import Button from '../Button';

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

const UpdatePost = ({ setIsEdit, dataEdit }) => {
  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataWards, setDataWards] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const { categories } = useSelector((state) => state.category);
  const { userDataByID } = useSelector((state) => state.user);
  const { editPost } = useSelector((state) => state.post);
  const [isLoading, setIsloading] = useState(false);
  console.log(editPost);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    acreage: '',
    images: [],
  });

  const { title, desc, price, acreage, images } = formData;
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
    const fetchPublicProvince = async () => {
      try {
        const response = await apiGetPublicProvince();
        if (response.status === 200) {
          setDataProvinces(response?.data?.results);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      if (province) {
        try {
          const response = await apiGetPublicDistrict(province);
          if (response.status === 200) {
            setDataDistricts(response?.data?.results);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    };
    province && fetchPublicDistrict();
    !province && setDataDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard(null);
    const fetchPubliceWard = async () => {
      try {
        if (district) {
          const response = await apiGetPublicWard(district);
          if (response.status === 200) {
            setDataWards(response?.data?.results);
          } else {
            console.error('Error fetching ward');
          }
        }
      } catch (error) {
        console.error('Error fetching ward:', error);
      }
    };
    district && fetchPubliceWard();
    !district && setDataWards([]);
  }, [district]);

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

  return (
    <div
      className="flex items-center px-5 justify-center fixed top-0 right-0 left-0 bottom-0 rounded-xl shadow-lg bg-overlay-30 backdrop-blur-sm"
      onClick={() => setIsEdit(false)}
    >
      <div
        className="relative max-w-[1200px] w-full max-h-[800px] h-full mt-[-50px] p-5 px-8 tl:px-5 overflow-y-scroll bg-white rounded-lg shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl font-semibold">Chỉnh sửa tin đăng</h2>
        <form>
          <div className="mt-4">
            <div className="w-full h-fit">
              <h2 className="font-semibold text-xl">Địa chỉ cho thuê</h2>
              <div className=" w-full flex flex-col gap-8">
                <Input
                  type="text"
                  label="Nhập địa chỉ cho thuê"
                  labelStyle={'font-semibold'}
                  id="address"
                  inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
                  placeholder={'Nhập số nhà và đường'}
                  className={'mt-5'}
                  typeName="address"
                />
                <div className="w-full flex flex-col gap-4">
                  <SelectorAddress
                    label="Tỉnh/Thành phố"
                    id="province"
                    options={dataProvinces}
                    value={province || 'a'}
                    setValue={setProvince}
                    type="province"
                  />
                  <SelectorAddress
                    label="Quận/Huyện"
                    id="district"
                    options={dataDistricts}
                    value={district || 'a'}
                    setValue={setDistrict}
                    type="district"
                  />
                  <SelectorAddress
                    className={'flex-2'}
                    label="Phường/Xã"
                    id="ward"
                    options={dataWards}
                    value={ward || 'a'}
                    setValue={setWard}
                    type="ward"
                  />
                </div>
                <Input
                  type="text"
                  inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
                  readOnly
                  label="Xác nhận địa chỉ"
                  id="exactly-address"
                  labelStyle={'font-semibold'}
                  value={editPost?.address}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-3 my-5">
            <h2 className="font-semibold text-xl">Thông tin mô tả</h2>
            <div className="w-full flex flex-col gap-3">
              <SelectorOverview
                label="Loại chuyên mục"
                options={categories}
                value={editPost?.categoryCode || categoryCode || 'a'}
                setValue={setCategoryCode}
                type="categoryCode"
              />
              <Input
                type="text"
                label="Tiêu đề"
                labelStyle={'font-semibold'}
                id="title"
                inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
                name="title"
                value={editPost?.title || title}
                onChange={handleInputChange}
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
                  value={editPost?.desc || desc}
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
                value={userDataByID?.name || ''}
              />
              <Input
                type="text"
                inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
                readOnly
                label="Số điện thoại"
                id="phone"
                labelStyle={'font-semibold'}
                name="userPhone"
                value={userDataByID?.phone || ''}
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
                  value={editPost?.priceNumber * 10 ** 6 || price}
                  onChange={handleInputChange}
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
                  value={editPost?.acreageNumber || acreage}
                  onChange={handleInputChange}
                  typeName="acreageNumber"
                />
              </div>
              <SelectorOverview
                label="Đối tượng cho thuê"
                options={targerts}
                value={editPost?.overviews?.target || genderCode || 'a'}
                setValue={setGenderCode}
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
                      wrapperStyle={{}}
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
          <div className="w-full flex items-center gap-2 my-5">
            <Button
              fullWidth
              text="Huỷ"
              className={'bg-red-500 hover:bg-red-400'}
              textStyle={'text-white'}
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(false);
              }}
            />
            <Button fullWidth text="Hoàn tất" className={'bg-green-500 hover:bg-green-400'} textStyle={'text-white'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
