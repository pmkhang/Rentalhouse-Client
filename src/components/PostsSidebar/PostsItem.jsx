import moment from 'moment';
import 'moment/locale/vi';
import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../utils/constant';
import unidecode from 'unidecode';
import { BiSolidStar } from 'react-icons/bi';

const PostsItem = ({ img, title, price, time, id, star }) => {
  const formatTime = useMemo(() => {
    return moment(time).fromNow();
  }, [time]);

  return (
    <>
      {title && (
        <div className="w-full flex items-center gap-2 border-b border-gray-300 pb-2">
          <Link
            to={`${path.DETAIL}${unidecode(title)
              ?.replace(/[-/.,]/g, '')
              ?.toLowerCase()
              ?.split(' ')
              ?.join('-')}/${id}`}
            className="w-[65px] h-[65px] inline-block"
          >
            <img src={img[0]} alt="thumbnail" className="w-full h-full object-cover rounded-md" />
          </Link>
          <div className="w-full flex flex-col justify-between gap-2">
            <Link
              to={`${path.DETAIL}${unidecode(title)
                ?.replace(/[-/.,]/g, '')
                ?.toLowerCase()
                ?.split(' ')
                ?.join('-')}/${id}`}
            >
              <h4 className="text-blue-600 text-sm ">
                <span className="inline-flex items-center gap-1">
                  {Array(star && +star)
                    .fill()
                    .map((_, index) => (
                      <span key={index} className="text-[14px] text-[#ffd454]">
                        <BiSolidStar />
                      </span>
                    ))}
                </span>{' '}
                {title?.slice(0, 45) + ' ...'}
              </h4>
            </Link>
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
