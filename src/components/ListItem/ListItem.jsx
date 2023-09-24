/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { memo, useState } from 'react';
import icons from '../../utils/icons';

const { BiSolidStar, BiHeart, BiSolidHeart, BsFillBookmarkStarFill } = icons;

const ListItem = ({ images, address, attributes, desc, star, title, users }) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const Address =
    address.replace('Cho thuê', '').trim().charAt(0).toUpperCase() + address.replace('Cho thuê', '').trim().slice(1);

  return (
    <div className="w-full flex items-center justify-between my-3 p-4 gap-5 bg-sky-100 rounded-xl shadow-lg tl:flex-col">
      <div className="w-2/5 flex gap-1 flex-wrap items-center justify-center relative cursor-pointer tl:w-full">
        {images &&
          (images.length >= 4
            ? images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  className="w-[118px] h-[118px] object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
                  }}
                />
              ))
            : [...images, 'your_additional_image_url'].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  className="w-[118px] h-[118px] object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
                  }}
                />
              )))}
        <span className="text-white text-xs bg-overlay-70 py-1 px-2 rounded-md absolute left-3 bottom-1">
          {`${images?.length}`} ảnh
        </span>
        <span
          className="text-white text-2xl p-2 rounded-md absolute right-2 bottom-1"
          onMouseEnter={() => setIsHoverHeart(!isHoverHeart)}
          onMouseLeave={() => setIsHoverHeart(!isHoverHeart)}
        >
          {isHoverHeart ? <BiSolidHeart color="red" /> : <BiHeart />}
        </span>
      </div>
      <div className="w-3/5 flex flex-col justify-between gap-2 tl:w-full">
        <div className="flex justify-between gap-[2px]">
          <h3 className="text-red-600 font-bold text-[14px]">
            <span className="inline-flex items-center gap-1">
              {Array(+star)
                .fill()
                .map((_, index) => (
                  <span key={index} className="text-[14px] text-[#ffd454]">
                    <BiSolidStar />
                  </span>
                ))}
            </span>
            {title}
          </h3>
          {+star === 5 && (
            <span className="pt-1 text-[#ffd454] text-[24px]">
              <BsFillBookmarkStarFill />
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-5 mb:flex-col mb:items-start mb:gap-2 ">
          <span className="font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="text-[14px]">{attributes?.acreage}</span>
          <span className="text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">{Address}</span>
        </div>
        <p className="text-gray-500 text-sm w-full h-[100px] text-ellipsis overflow-hidden">{desc}</p>
        <div className="flex items-center justify-between mb:flex-col mb:items-start mb:gap-3">
          <div className="flex items-center gap-2 mb:w-full mb:justify-center">
            <img
              src="https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <span className="text-sm text-gray-500">{users?.name.substring(0, 2) + '....'}</span>
          </div>
          <div className="flex items-center gap-2 mb:w-full mb:justify-center">
            <a href={`#`} className="text-xs text-white bg-blue-600 p-2 rounded-lg">
              {`Gọi ${users?.phone.substring(0, 5) + 'xxxxx'}`}
            </a>
            <a href={`#`} className="text-xs text-blue-600 border border-blue-600 p-2 rounded-lg">
              Nhắn Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ListItem);
