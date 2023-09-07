import React, { memo } from 'react';

const Button = ({ text, textColor, bgColor, fullWidth, IconLeft, IconRight, onClick, className }) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 py-2 px-4 ${className} ${textColor} ${bgColor} ${
        fullWidth && 'w-full'
      } outline-none rounded-md flex items-center justify-center gap-1 hover:underline`}
      onClick={onClick}
    >
      {IconLeft && <IconLeft />}
      {text}
      {IconRight && <IconRight />}
    </button>
  );
};

export default memo(Button);
