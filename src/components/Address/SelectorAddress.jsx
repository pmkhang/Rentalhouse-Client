import React from 'react';
import { memo } from 'react';

const SelectorAddress = ({
  label,
  id,
  options,
  value = 'a',
  type,
  className,
  invalidField,
  onFocus,
  onChange,
}) => {
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
    <div className={`flex flex-col w-1/2 gap-2 tl:w-full ${className}`}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <select
        id={id}
        defaultValue={value}
        onChange={onChange}
        className="outline-none border border-gray-400 rounded-md py-1 px-2 text-sm"
        onFocus={onFocus}
      >
        <option value="">-- Chọn {label} --</option>
        {options?.map((item) => (
          <option key={item[valueKey]} value={item[valueKey]}>
            {item[nameKey]}
          </option>
        ))}
      </select>
      {value === 'a' && type !== 'ward' ? (
        <span className="text-red-500 text-xs">
          {invalidField && invalidField?.some((i) => i?.name === `${type}Name`)
            ? invalidField?.find((i) => i?.name === `${type}Name`)?.message
            : ''}
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(SelectorAddress);
