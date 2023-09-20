import React from 'react';
import { memo } from 'react';

const SelectorAddress = ({ label, id, options, value = 'a', setValue, type }) => {
  let valueKey;
  let nameKey;

  switch (type) {
    case 'province':
      valueKey = 'province_id';
      nameKey = 'province_name';
      break;
    case 'district':
      valueKey = 'district_id';
      nameKey = 'district_name';
      break;
    case 'ward':
      valueKey = 'ward_id';
      nameKey = 'ward_name';
      break;
    default:
      valueKey = '';
      nameKey = '';
  }

  return (
    <div className="flex flex-col flex-1 gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="outline-none border border-gray-400 rounded-md py-1 px-2 text-sm"
      >
        <option value="">-- Chọn {label} --</option>
        {options?.map((item) => (
          <option key={item[valueKey]} value={item[valueKey]}>
            {item[nameKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectorAddress);
