import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Address from '../../components/Address';
import Button from '../../components/Button';
import Overview from '../../components/Overview';
import { getCodesWithNumber } from '../../utils/Common/getCodes';
import { apiCreatePost } from '../../services/post';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pathSystem } from '../../utils/constant';
import { validate } from '../../utils/Common/validateFields';
import { useForm } from 'react-hook-form';

const tips = [
  'Nội dung phải viết bằng tiếng Việt có dấu',
  'Tiêu đề tin không dài quá 100 kí tự',
  'Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.',
  'Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.',
  'Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!',
];

const CreatePost = () => {
  const { prices } = useSelector((state) => state.price);
  const { acreages } = useSelector((state) => state.acreage);
  const [invalidField, setInvalidField] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Đăng tin cho thuê';
  }, []);

  const [payload, setPayload] = useState({
    title: '',
    address: '',
    desc: '',
    target: '',
    provinceName: '',
    districtName: '',
    provinceCode: '',
    districtCode: '',
    categoryCode: '',
    categoryName: '',
    priceCode: '',
    acreageCode: '',
    acreageNumber: '',
    priceNumber: '',
    userID: '',
    label: '',
    images: [],
    star: Math.ceil(Math.random() * 5),
  });

  const {
    acreageNumber,
    priceNumber,
    districtName,
    categoryName,
    title,
    address,
    desc,
    target,
    provinceName,
    categoryCode,
  } = payload;

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      acreageCode: getCodesWithNumber(acreageNumber, acreages)?.code,
      priceCode: getCodesWithNumber(priceNumber, prices)?.code,
      label: `${categoryName} ${districtName}`,
    }));
  }, [acreageNumber, acreages, categoryName, districtName, priceNumber, prices]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const result = validate(
      { provinceName, districtName, categoryCode, address, target, title, desc, acreageNumber, priceNumber },
      setInvalidField,
    );
    if (result === 0 && payload) {
      await apiCreatePost(payload);
      toast.success('Đăng tin cho thuê thành công !');
      navigate(`/quan-ly/${pathSystem.POSTS}`);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-medium py-4 border-b border-gray-200">{'Đăng tin mới'}</h2>
      <div className="w-full flex gap-5">
        <form className="w-[70%] min-h-[1800px] flex flex-col gap-8 py-4 tl:w-full" onSubmit={handleSubmit(onSubmit)}>
          <Address
            invalidField={invalidField}
            setInvalidField={setInvalidField}
            setPayload={setPayload}
            register={register}
            errors={errors}
          />
          <Overview invalidField={invalidField} setInvalidField={setInvalidField} setPayload={setPayload} />
          <div className="w-full flex items-center gap-3">
            <Button
              text={'Đăng tin'}
              className={'bg-green-700 focus:ring-green-500 hover:bg-green-600'}
              textStyle={'text-white font-semibold'}
              fullWidth
            />
          </div>
        </form>
        <div className="w-[30%] py-4 tl:hidden">
          {/*TODO: Google Map*/}
          <div className="p-5 bg-orange-100 text-orange-600 flex flex-col gap-3 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Lưu ý khi đăng tin</h3>
            {tips.map((i, index) => (
              <span key={index}>- {i}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
