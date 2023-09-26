import { memo } from 'react';
import { location } from '../../utils/constant';
import ProvinceBtn from './ProvinceBtn';

const Province = () => {
  return (
    <div className="flex w-full items-center justify-around mb:flex-col mb:gap-5 mt-3">
      {location.map((item) => (
        <ProvinceBtn key={item.id} name={item.name} img={item.img} provinceCode={item.provinceCode} />
      ))}
    </div>
  );
};

export default memo(Province);
