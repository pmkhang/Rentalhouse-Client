import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateUserPosts, apiUploadImages } from '../../services/post';
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../../services/province';
import SelectorAddress from '../Address/SelectorAddress';
import Input from '../Input';
import SelectorOverview from '../Overview/SelectorOverview';
import Button from '../Button';
import icons from '../../utils/icons';
import { getCodesWithNumber } from '../../utils/Common/getCodes';
import { useForm } from 'react-hook-form';
import { pathSystem } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserPosts } from '../../redux/action/postAction';

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

const UpdatePost = ({ setIsEdit }) => {
  const { categories } = useSelector((state) => state.category);
  const { editPost } = useSelector((state) => state.post);
  const { userDataByID } = useSelector((state) => state.user);
  const { acreages } = useSelector((state) => state.acreage);
  const { prices } = useSelector((state) => state.price);
  const addresString = editPost?.address.split(',');

  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataWards, setDataWards] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const [addressSate, setAddressSate] = useState({
    addressStreet: addresString[0].trim() || '',
    wardName: addresString[addresString.length - 3].trim() || '',
    districtName: addresString[addresString.length - 2].trim() || '',
    provinceName: addresString[addresString.length - 1].trim() || '',
  });

  const [imagesS, setImagesS] = useState({
    imaage: JSON.parse(editPost?.images.image) || [],
  });
  const { imaage } = imagesS;

  const { addressStreet, wardName, districtName, provinceName } = addressSate;
  const [PriceNumber, setPriceNumber] = useState(editPost?.priceNumber * 10 ** 6);

  const [editDataPayload, setEditDataPayload] = useState({
    postID: editPost?.id,
    attributesID: editPost?.attributesID,
    imagesID: editPost?.imagesID,
    overviewID: editPost?.overviewID,
    acreageCode: editPost?.acreageCode || '',
    acreageNumber: editPost?.acreageNumber || '',
    title: editPost?.title || '',
    address: editPost?.address || '',
    categoryCode: editPost?.categoryCode || '',
    categoryName: categories?.find((i) => i?.code === editPost?.categoryCode)?.value || '',
    desc: JSON.parse(editPost?.desc) || '',
    label: editPost?.labels.value || '',
    priceCode: editPost?.priceCode || '',
    priceNumber: '',
    star: editPost?.star || '',
    target: editPost?.overviews.target,
  });

  const { title, acreageNumber, categoryCode, desc, target } = editDataPayload;

  const handleSetEditDataPayloadCategogy = (value) => {
    setEditDataPayload((prev) => ({
      ...prev,
      categoryCode: value,
    }));
  };
  const handleSetEditDataPayload = (value) => {
    setEditDataPayload((prev) => ({
      ...prev,
      target: value,
    }));
  };

  useEffect(() => {
    setProvince(dataProvinces?.find((i) => i.province_name === provinceName)?.province_id);
  }, [dataProvinces, provinceName]);

  useEffect(() => {
    setDistrict(dataDistricts?.find((i) => i?.district_name === districtName)?.district_id);
  }, [dataDistricts, districtName]);

  useEffect(() => {
    setWard(dataWards?.find((i) => i?.ward_name === wardName)?.ward_id);
  }, [dataWards, wardName]);

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

  useEffect(() => {
    setEditDataPayload((prev) => ({
      ...prev,
      categoryName: categories?.find((i) => i?.code === categoryCode)?.value,
    }));
  }, [categories, categoryCode]);

  useEffect(() => {
    setEditDataPayload((prev) => ({
      ...prev,
      acreageCode: getCodesWithNumber(acreageNumber, acreages)?.code,
      priceCode: getCodesWithNumber(PriceNumber / 10 ** 6, prices)?.code,
    }));
  }, [acreageNumber, acreages, PriceNumber, prices]);

  useEffect(() => {
    if (district && ward && province) {
      setAddressSate((prev) => ({
        ...prev,
        districtName: dataDistricts?.find((i) => i?.district_id === district)?.district_name || '',
        wardName: dataWards?.find((i) => i.ward_id === ward)?.ward_name || '',
        provinceName: dataProvinces?.find((i) => i?.province_id === province)?.province_name || '',
      }));
    }
  }, [dataDistricts, dataProvinces, dataWards, district, province, ward]);

  useEffect(() => {
    if (addressStreet && districtName && wardName && provinceName) {
      setEditDataPayload((prev) => ({
        ...prev,
        address: `${addressStreet}, ${wardName && wardName}, ${districtName && districtName}, ${
          provinceName && provinceName
        }`,
      }));
    }
  }, [addressStreet, districtName, provinceName, wardName]);

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
          setImagesS((prev) => ({
            ...prev,
            imaage: [...prev.imaage, response?.data?.secure_url],
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
    const indexToRemove = imagesS.imaage.indexOf(i);
    if (indexToRemove !== -1) {
      const updatedImages = [...imagesS.imaage];
      updatedImages.splice(indexToRemove, 1);
      setImagesS((prev) => ({
        ...prev,
        imaage: updatedImages,
      }));
    }
  };

  useEffect(() => {
    setEditDataPayload((prev) => ({
      ...prev,
      images: JSON.stringify(imaage),
      provinceName: dataProvinces?.find((i) => i?.province_id === province)?.province_name || '',
    }));
  }, [dataProvinces, imaage, province]);

  useEffect(() => {
    setEditDataPayload((prev) => ({
      ...prev,
      priceNumber: PriceNumber / 10 ** 6,
    }));
  }, [PriceNumber]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const response = await apiUpdateUserPosts(editDataPayload);
      if (response.status === 200) {
        dispatch(getUserPosts());
        toast.success('Sửa tin thành công !');
        setIsEdit(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex items-center px-5 justify-center fixed top-0 right-0 left-0 bottom-0 rounded-xl shadow-lg bg-overlay-30 backdrop-blur-sm">
      <div
        className="relative max-w-[1200px] w-full max-h-[800px] h-full mt-[-50px] p-5 px-8 tl:px-5 overflow-y-scroll bg-white rounded-lg shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl font-semibold">Chỉnh sửa tin đăng</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="w-full h-fit">
              <h2 className="font-semibold text-xl">Địa chỉ cho thuê</h2>
              <div className=" w-full flex flex-col gap-8">
                <Input
                  {...register('address', { required: 'Bạn cần phải nhập trường này!' })}
                  type="text"
                  label="Nhập địa chỉ cho thuê"
                  labelStyle={'font-semibold'}
                  id="address"
                  inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
                  placeholder={'Nhập số nhà và đường'}
                  className={'mt-5'}
                  typeName="address"
                  value={addressStreet || ''}
                  onChange={(e) =>
                    setAddressSate((prev) => ({
                      ...prev,
                      addressStreet: e.target.value,
                    }))
                  }
                  errors={errors?.address}
                />
                <div className="w-full flex flex-col gap-4">
                  <SelectorAddress
                    label="Tỉnh/Thành phố"
                    id="province"
                    options={dataProvinces}
                    type="province"
                    value={province || 'a'}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                  <SelectorAddress
                    label="Quận/Huyện"
                    id="district"
                    options={dataDistricts}
                    value={district || 'a'}
                    type="district"
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  <SelectorAddress
                    className={'flex-2'}
                    label="Phường/Xã"
                    id="ward"
                    options={dataWards}
                    value={ward || 'a'}
                    onChange={(e) => setWard(e.target.value)}
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
                  value={`${addressStreet}, ${wardName}, ${districtName}, ${provinceName}`}
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
                type="categoryCode"
                value={categoryCode}
                setValue={(value) => handleSetEditDataPayloadCategogy(value)}
              />
              <Input
                {...register('title', { required: 'Bạn cần phải nhập trường này!' })}
                errors={errors?.title}
                type="text"
                label="Tiêu đề"
                labelStyle={'font-semibold'}
                id="title"
                inputStyle={'py-2 bg-white focus:border focus:border-blue-400'}
                name="title"
                typeName="title"
                value={title || ''}
                onChange={(e) =>
                  setEditDataPayload((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="content" className="text-base block font-semibold text-gray-900 cursor-pointer">
                  Nội dung mô tả
                </label>
                <textarea
                  {...register('content', { required: 'Bạn cần phải nhập trường này!' })}
                  id="content"
                  className="w-full min-h-[200px] p-3 outline-none border border-gray-300 rounded-md focus:border-blue-400"
                  name="desc"
                  value={desc || ''}
                  onChange={(e) =>
                    setEditDataPayload((prev) => ({
                      ...prev,
                      desc: e.target.value,
                    }))
                  }
                />
                {errors?.content && <span className="text-red-500 text-xs">{errors?.content?.message}</span>}
              </div>
              <Input
                type="text"
                inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
                readOnly
                label="Thông tin liên hệ"
                id="info"
                labelStyle={'font-semibold'}
                name="userName"
                value={userDataByID?.name}
              />
              <Input
                type="text"
                inputStyle={'py-2 bg-gray-200 focus:border focus:border-blue-400'}
                readOnly
                label="Số điện thoại"
                id="phone"
                labelStyle={'font-semibold'}
                name="userPhone"
                value={userDataByID?.phone}
              />
              <div className="w-1/2 tl:w-full">
                <Input
                  {...register('price', { required: 'Bạn cần phải nhập trường này!' })}
                  errors={errors?.price}
                  type="text"
                  inputStyle={'py-2 bg-white rounded-r-none border-r-0 focus:border focus:border-blue-400'}
                  label="Giá cho thuê"
                  id="price"
                  labelStyle={'font-semibold'}
                  name="price"
                  decs1={'Đồng/tháng'}
                  decs2={'Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'}
                  typeName="priceNumber"
                  value={PriceNumber || ''}
                  onChange={(e) => setPriceNumber(e.target.value)}
                />
                <Input
                  {...register('acreage', { required: 'Bạn cần phải nhập trường này!' })}
                  errors={errors?.acreage}
                  type="number"
                  inputStyle={'py-2 bg-white rounded-r-none border-r-0  focus:border focus:border-blue-400'}
                  label="Diện tích"
                  id="acreage"
                  labelStyle={'font-semibold'}
                  name="acreage"
                  decs1={'m²'}
                  typeName="acreageNumber"
                  value={acreageNumber || ''}
                  onChange={(e) =>
                    setEditDataPayload((prev) => ({
                      ...prev,
                      acreageNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <SelectorOverview
                label="Đối tượng cho thuê"
                options={targerts}
                type="target"
                value={target}
                setValue={(value) => handleSetEditDataPayload(value)}
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
              {imaage.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold">Hình đã upload</h3>
                  <div className="flex flex-wrap gap-6 items-center">
                    {imaage?.map((i, index) => (
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
            <Button
              fullWidth
              text="Hoàn tất"
              className={'bg-green-500 hover:bg-green-400'}
              textStyle={'text-white'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
