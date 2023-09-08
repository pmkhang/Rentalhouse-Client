import React, { memo } from 'react';

const Button = ({ text, fullWidth, IconLeft, IconRight, onClick, className }) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-1 bg-gradient-to-r focus:ring-4 outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-1 focus:outline-none ${className} ${
        fullWidth && 'w-full'
      } `}
      onClick={onClick}
    >
      {IconLeft && <IconLeft />}
      {text}
      {IconRight && <IconRight />}
    </button>
  );
};

export default memo(Button);
