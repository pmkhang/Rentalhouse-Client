/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from 'react';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Pagination from '../../components/Pagination';

const List = ({ posts, count, number }) => {
  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between mb:flex-col mb:items-start">
        <h3 className="text-xl font-semibold">Danh sách tin đăng</h3>
        <span>Cập nhật: 12:05 25/08/2023</span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[13.3px]">Sắp xếp: </span>
        <Button
          text="Mặc định"
          className={'py-[3px] px-2 bg-gray-200 hover:translate-y-[-3px] focus:ring-gray-400'}
          textStyle={'text-[13.3px]'}
        />
        <Button
          text="Mới nhất"
          className={'py-[3px] px-2 bg-gray-200 hover:translate-y-[-3px] focus:ring-gray-400'}
          textStyle={'text-[13.3px]'}
        />
      </div>
      <div className="flex flex-col gap-1 mt-5">
        {posts &&
          posts.map((item) => (
            <ListItem
              key={item?.id}
              address={item?.labels.value}
              attributes={item?.attributes}
              desc={JSON.parse(item?.desc)}
              images={JSON.parse(item?.images?.image)}
              star={item?.star}
              title={item?.title}
              users={item?.users}
            />
          ))}
      </div>
      <Pagination length={count / 5} count={count || 0} number={number} />
    </div>
  );
};

export default memo(List);
