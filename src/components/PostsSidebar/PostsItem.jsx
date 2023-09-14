import React from 'react';

const PostsItem = ({ img, title, price, time }) => {
  return (
    <>
      {title && (
        <div className="w-full flex items-center gap-2 border-b border-gray-300 pb-2">
          <img src={img} alt="thumbnail" className="w-[65px] h-[65px] object-contain rounded-md" />
          <div className="w-full flex flex-col justify-between ">
            <h4 className="text-blue-600 text-sm ">{title?.slice(0, 45) + ' ...'}</h4>
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold text-green-600">{price}</span>
              <span className="text-gray-400 text-sm">{time}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsItem;
