import React, { memo } from 'react';

const Button = ({ type = 'buttom', text, textStyle, fullWidth, IconLeft, IconRight, onClick, className }) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-1 transition-all bg-gradient-to-r shadow-md focus:ring-4 outline-none rounded-lg  px-5 py-2 ${className} ${
        fullWidth && 'w-full'
      } `}
      onClick={onClick}
    >
      <span className={`${textStyle} inline-flex items-center justify-center tl:justify-start w-full overflow-hidden text-ellipsis whitespace-nowrap gap-2`}>
        {IconLeft && <IconLeft />}
        {text}
        {IconRight && <IconRight />}
      </span>
    </button>
  );
};

export default memo(Button);
