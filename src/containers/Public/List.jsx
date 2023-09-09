import React from 'react';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';

const List = () => {
  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between">
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
        <ListItem />
      </div>
    </div>
  );
};

export default List;
