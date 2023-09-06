import React, { memo } from 'react';

const Input = ({ label, id, type, name, onChange, placeholder, value, invalidField, onFocus }) => {
  return (
    <div className="">
      {type === 'checkbox' || type === 'radio' ? (
        <>
          <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
          />
          <label htmlFor={id} className="text-base">
            {label}
          </label>
        </>
      ) : (
        <>
          <label htmlFor={id} className="text-base">
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
            className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
          />
          {invalidField.length > 0 && invalidField.some((i) => i.name === name) && (
            <span className="text-red-500 italic">{invalidField.find((i) => i.name === name)?.message}</span>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Input);
