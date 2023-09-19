import React, { useEffect } from 'react';
import Address from '../../components/Address';
import Overview from '../../components/Overview';
import { useState } from 'react';

const CreatePost = () => {
  useEffect(() => {
    document.title = 'Đăng tin cho thuê';
  }, []);

  const [payload, setPayload] = useState({
    title: '',
    userName: '',
    userPhone: '',
    priceNumber: 0,
    acreageNumber: 0,
    images: [],
    address: '',
    priceCode: '',
    acreageCode: '',
    desc: '',
    target: '',
    province: '',
    categoryCode: '',
  });
  console.log(payload);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h2>
      <div className="w-full flex gap-5">
        <div className="w-[70%] flex flex-col gap-8 py-4 tl:w-full">
          <Address setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
        </div>
        <div className="w-[30%] py-4 tl:hidden">
          <div className="w-full min-h-[500px] border border-red-400 ">Map</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
