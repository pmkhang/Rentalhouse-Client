import React from 'react';
import { useSelector } from 'react-redux';

const User = () => {
  const { userDataByID } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-3">
      <img
        src={
          userDataByID?.avatar ||
          'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
        }
        alt="avatar"
        className="w-[40px] h-[40px] object-contain shadow-md rounded-full border border-gray-400"
      />
      <div className="flex flex-col">
        <span className="text-sm">
          Xin chào! <span className="font-semibold text-base">{userDataByID?.name}</span>
        </span>
        <span>
          Mã tài khoản: <span className="font-medium text-base">{userDataByID?.id}</span>
        </span>
      </div>
    </div>
  );
};

export default User;
