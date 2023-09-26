import React, { memo } from 'react';
import icons from '../../utils/icons';
import Button from '../Button';

const { BsDot, BsFillTelephoneFill, BiSolidHeart } = icons;

const Boxinfo = ({ userInfo }) => {
  return (
    <div className="w-full h-fit flex flex-col gap-2 items-center p-3 rounded-md shadow-md bg-orange-400">
      <img
        src={
          userInfo?.avatar ||
          'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
        }
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full shadow-lg"
      />
      <h3 className="text-lg text-white">{userInfo?.name.substring(0, 5) + '....'}</h3>
      <p className="flex items-center text-sm mr-4 mt-[-18px]">
        <BsDot size={32} color="#16a34a" />
        <span className="text-gray-800">Đang hoạt động</span>
      </p>
      <Button
        fullWidth
        text={userInfo?.phone.substring(0, 5) + '....'}
        className={'bg-green-600 focus:ring-green-300 hover:bg-green-500'}
        textStyle={'text-white font-semibold'}
        IconLeft={BsFillTelephoneFill}
      />
      <Button
        fullWidth
        text={'Nhắn Zalo'}
        className={'bg-white focus:ring-gray-200 hover:bg-gray-100'}
        textStyle={'font-semibold text-orange-400'}
      />
      <Button
        fullWidth
        text={'Yêu thích'}
        className={'bg-white focus:ring-gray-200 hover:bg-gray-100'}
        textStyle={'font-semibold text-orange-400'}
        IconLeft={BiSolidHeart}
      />
    </div>
  );
};

export default memo(Boxinfo);
