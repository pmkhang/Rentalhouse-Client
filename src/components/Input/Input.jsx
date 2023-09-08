import React, { memo } from 'react';

const Input = ({ label, id, type = 'text', name, onChange, placeholder, value, invalidField, onFocus }) => {
  return (
    <>
      {type === 'checkbox' || type === 'radio' ? (
        <div className="inline-flex gap-1 items-center mb-2 ml-1">
          <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label htmlFor={id} className="text-base ml-2 font-medium text-gray-900">
            {label}
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label
            htmlFor={id}
            className={`text-base block font-medium text-gray-900 ${invalidField.length > 0 && 'text-red-900'}`}
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            value={value}
            className={`outline-none bg-[#f9fbff] p-3 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${
              invalidField.length > 0 && 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700'
            }`}
          />
          {invalidField.length > 0 && invalidField.some((i) => i.name === name) && (
            <span className="text-red-500 italic">{invalidField.find((i) => i.name === name)?.message}</span>
          )}
        </div>
      )}
    </>
  );
};

export default memo(Input);
