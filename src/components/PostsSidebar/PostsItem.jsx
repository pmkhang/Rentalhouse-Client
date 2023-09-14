import moment from 'moment';
import 'moment/locale/vi';
import React, { memo, useMemo } from 'react';

const PostsItem = ({ img, title, price, time }) => {
  
  const formatTime = useMemo(() => {
    return moment(time).fromNow();
  }, [time]);

  return (
    <>
      {title && (
        <div className="w-full flex items-center gap-2 border-b border-gray-300 pb-2">
          <img src={img[0]} alt="thumbnail" className="w-[65px] h-[65px] object-cover rounded-md" />
          <div className="w-full flex flex-col justify-between gap-2">
            <h4 className="text-blue-600 text-sm ">{title?.slice(0, 45) + ' ...'}</h4>
            <div className="w-full flex items-center justify-between">
              <span className="font-semibold text-green-600 text-sm">{price}</span>
              <span className="text-gray-400 text-sm">{formatTime}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(PostsItem);
