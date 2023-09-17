import React, { memo, useMemo } from 'react';
import { dataIntro } from '../../utils/dataIntro';
import Button from '../Button';
import icons from '../../utils/icons';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
const { BiSolidStar } = icons;
const star = [1, 2, 3, 4, 5];

const Intro = () => {
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const memoizedCategories = useMemo(() => {
    return categories?.map((item) => ({
      key: item.code,
      title: item.value,
      path: item.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-'),
    }));
  }, [categories]);

  return (
    <div className="min-h-[500px] w-full flex flex-col items-center justify-center p-12 gap-4 mb:p-8 bg-white rounded-lg shadow-lg">
      <h3 className="font-bold text-[20px]">{dataIntro.title}</h3>
      <p className="text-center text-gray-600">
        {`${dataIntro.desc1} `}
        <span className="inline-flex gap-2 mb:flex-col mb:flex mb:p-2">
          {memoizedCategories.map((i) => (
            <Link key={i.key} to={i.path} className="inline-block text-blue-600 font-semibold hover:text-red-500">
              {i.title},
            </Link>
          ))}
        </span>
        {` ${dataIntro.desc2}`}
      </p>
      <ul className="w-[80%] flex items-center justify-between mb:flex-col mb:gap-5">
        {dataIntro.statistic.map((i, index) => (
          <li key={index} className="flex flex-col items-center justify-center">
            <h4 className="font-bold text-[20px]">{i.value}</h4>
            <p className="text-gray-700">{i.name}</p>
          </li>
        ))}
      </ul>
      <h3 className="font-bold text-center text-[20px]">{dataIntro.price}</h3>
      <div className="flex items-center gap-3">
        {star.map((i, index) => (
          <span key={index} className="text-[24px] text-yellow-400">
            <BiSolidStar />
          </span>
        ))}
      </div>
      <p className="text-center text-gray-600 text-sm italic">{dataIntro.comment}</p>
      <span className="text-sm text-gray-500">{dataIntro.author}</span>
      <h3 className="font-bold text-center text-[20px]">{dataIntro.question}</h3>
      <span className="text-md text-gray-500 text-sm">{dataIntro.answer}</span>
      {!isLoggedIn && (
        <Button
          text={'Đăng ký ngay'}
          className={'bg-orange-500 hover:bg-orange-400 focus:ring-orange-300'}
          textStyle={'font-bold text-white text-sm'}
          onClick={() => {
            navigate('/dang-ky');
          }}
        />
      )}
    </div>
  );
};

export default memo(Intro);
