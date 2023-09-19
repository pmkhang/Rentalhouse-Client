import React from 'react';
import { memo } from 'react';

const SelectorAddress = ({ label, id, options, value, setValue, type }) => {
  return (
    <div className="flex flex-col py-4 flex-1 gap-2">
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
        {options?.map((i) => (
          <option
            key={type === 'province' ? i?.province_id : i?.district_id}
            value={type === 'province' ? i?.province_id : i?.district_id}
          >
            {type === 'province' ? i?.province_name : i?.district_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectorAddress);
