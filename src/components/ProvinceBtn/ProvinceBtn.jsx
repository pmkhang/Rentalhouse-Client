import React, { memo } from 'react';

const ProvinceBtn = ({ name, img }) => {
  return (
    <div className="flex flex-col gap-1 items-center bg-white rounded-md shadow-md cursor-pointer transition-all hover:shadow-lg hover:translate-y-[-4px] text-blue-700 hover:text-red-500">
      <img src={img} alt={name} className="w-[220px] h-[110px] object-cover rounded-t-md" />
      <span className="p-3 text-sm font-bold drop-shadow-md">{name}</span>
    </div>
  );
};

export default memo(ProvinceBtn);
