import React, { memo } from 'react';

const Button = ({ type = 'buttom', text, textStyle, fullWidth, IconLeft, IconRight, onClick, className, disabled }) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-1 transition-all shadow-md focus:ring-4 outline-none rounded-lg  px-5 py-2 ${className} ${
        fullWidth && 'w-full'
      } `}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={` w-full inline-flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap gap-2 ${textStyle}`}
      >
        {IconLeft && <IconLeft />}
        {text}
        {IconRight && <IconRight />}
      </span>
    </button>
  );
};

export default memo(Button);
