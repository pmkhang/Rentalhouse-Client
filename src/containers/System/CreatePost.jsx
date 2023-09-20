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

const CreatePost = () => {
  const { prices } = useSelector((state) => state.price);
  const { acreages } = useSelector((state) => state.acreage);
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
    acreageNumber: 0,
    priceNumber: 0,
    userID: '',
    label: '',
    images: [],
    star: Math.ceil(Math.random() * 5),
  });

  const { acreageNumber, priceNumber, districtName, categoryName } = payload;

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      acreageCode: getCodesWithNumber(acreageNumber, acreages)?.code || '',
      priceCode: getCodesWithNumber(priceNumber, prices)?.code || '',
      label: `${categoryName} ${districtName}`,
    }));
  }, [acreageNumber, acreages, categoryName, districtName, priceNumber, prices]);

  const handleSubmit = async () => {
    if (payload) {
      await apiCreatePost(payload);
      toast.success('Đăng tin cho thuê thành công !');
      navigate(`/quan-ly/${pathSystem.POSTS}`);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h2>
      <div className="w-full flex gap-5">
        <div className="w-[70%] min-h-[1800px] flex flex-col gap-8 py-4 tl:w-full">
          <Address setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <Button
            text={'Đăng tin'}
            className={'bg-green-700 focus:ring-green-500 hover:bg-green-600'}
            textStyle={'text-white font-semibold'}
            onClick={handleSubmit}
          />
        </div>
        <div className="w-[30%] py-4 tl:hidden">
          <div className="w-full min-h-[500px] border border-red-400 ">Map</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;