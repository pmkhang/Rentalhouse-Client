import React, { useEffect } from 'react';
import Address from '../../components/Address';
import Overview from '../../components/Overview';

const CreatePost = () => {
  useEffect(() => {
    document.title = 'Đăng tin cho thuê';
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h2>
      <div className="w-full flex gap-5">
        <div className="w-[70%] flex flex-col gap-4 py-4">
          <Address />
          <Overview />
        </div>
        <div className="w-[30%] py-4">
          <div className="w-full min-h-[500px] border border-red-400">Map</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
