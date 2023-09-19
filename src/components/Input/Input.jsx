import React, { memo } from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  max,
  min,
  name,
  step,
  onChange,
  placeholder,
  value,
  invalidField = false,
  onFocus,
  className,
  inputStyle,
  onClick,
  checked,
  readOnly,
  labelStyle,
  decs1,
  decs2,
}) => {
  return (
    <>
      {type === 'checkbox' || type === 'radio' ? (
        <div className={`inline-flex gap-1 items-center mb-2 ml-1 ${className}`} onClick={onClick}>
          <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            defaultChecked={checked}
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 ${inputStyle}`}
          />
          <label htmlFor={id} className="w-full text-base ml-2 font-medium text-gray-900  cursor-pointer">
            {label}
          </label>
        </div>
      ) : (
        <div className={`flex flex-col gap-1 ${className}`}>
          <label
            htmlFor={id}
            className={`text-base block font-medium text-gray-900 cursor-pointer ${
              invalidField.length > 0 && 'text-red-900'
            } ${labelStyle}`}
          >
            {label}
          </label>
          <div className="flex items-center">
            <input
              type={type}
              id={id}
              name={name}
              onChange={onChange}
              onFocus={onFocus}
              placeholder={placeholder}
              value={value}
              max={max}
              min={min}
              step={step}
              readOnly={readOnly}
              className={`outline-none bg-[#f9fbff] p-3 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${
                invalidField?.length > 0 && 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700'
              } ${inputStyle}`}
            />
            {decs1 && <span className="p-2 text-sm border border-gray-300 bg-slate-100 rounded-r-md">{decs1}</span>}
          </div>
          {invalidField?.length > 0 && invalidField?.some((i) => i?.name === name) && (
            <span className="text-red-500 italic">{invalidField?.find((i) => i?.name === name)?.message}</span>
          )}
          {decs2 && <span className="p-2 text-xs mt-[-6px] text-gray-400">{decs2}</span>}
        </div>
      )}
    </>
  );
};

export default memo(Input);
