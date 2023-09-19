import React from 'react';
import { memo } from 'react';

const SelectorOverview = ({ label, id, options, value, setValue, type }) => {
  
  return (
    <div className="flex flex-col py-4 gap-2 w-1/2">
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
          <option key={i?.code} value={i?.code}>
            {i?.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectorOverview);
