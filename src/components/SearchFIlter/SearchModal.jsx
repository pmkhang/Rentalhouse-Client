import React, { memo } from 'react';
import icons from '../../utils/icons';
import Button from '../Button';
import Input from '../Input';

const { MdOutlineKeyboardArrowLeft } = icons;
const SearchModal = ({ setShowModal, content, title, name }) => {
  return (
    <div
      onClick={(e) => {
        setShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="max-w-[700px] w-full px-5"
      >
        <div className="w-full min-h-[500px] flex flex-col bg-white p-5  rounded-lg shadow-lg">
          {content && (
            <>
              <div className="h-[45px] w-full flex items-center justify-between px-2 border-b border-gray-300">
                <MdOutlineKeyboardArrowLeft
                  size={32}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                  className="cursor-pointer"
                />
                <h3 className="mr-6 text-lg font-semibold">{title}</h3>
                <span></span>
              </div>
              <div className="p-4 flex flex-col w-full gap-4">
                {content?.map((i) => (
                  <Input
                    className={'w-full border-b border-gray-300 pb-3 cursor-pointer'}
                    key={i?.code}
                    value={i?.code}
                    type="radio"
                    label={i?.value}
                    id={i?.code}
                    name={name}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchModal);
