import React, { memo, useEffect, useState } from 'react';
import icons from '../../utils/icons';
import Input from '../Input';

const { FaTimes } = icons;
const SearchModal = ({ setShowModal, content, title, name }) => {
  const [persent1, setPersent1] = useState(0);
  const [persent2, setPersent2] = useState(100);

  useEffect(() => {
    const activeTrack = document.getElementById('track-active');
    const leftPercent = Math.min(persent1, persent2);
    const rightPercent = Math.max(persent1, persent2);

    activeTrack.style.left = `${leftPercent}%`;
    activeTrack.style.right = `${100 - rightPercent}%`;
  }, [persent1, persent2]);

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
        <div className="w-full h-fit flex flex-col bg-white p-5  rounded-lg shadow-lg">
          <div className="h-[45px] w-full flex items-center justify-between border-b border-gray-300">
            <span></span>
            <h3 className="ml-4 text-lg font-semibold">{title}</h3>
            <FaTimes
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
              className="cursor-pointer"
            />
          </div>
          {(name === 'category' || name === 'province') && (
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
          )}
          {(name === 'price' || name === 'acreage') && (
            <div className="w-full p-4">
              <div className="w-full relative flex flex-col items-center justify-center">
                <input
                  type="range"
                  max="100"
                  min="0"
                  step="5"
                  value={persent1}
                  onChange={(e) => setPersent1(e.target.value)}
                  className={'w-full appearance-none pointer-events-none absolute top-0 bottom-0 z-20'}
                />
                <input
                  type="range"
                  max="100"
                  min="0"
                  step="5"
                  value={persent2}
                  onChange={(e) => setPersent2(e.target.value)}
                  className={'w-full appearance-none pointer-events-none absolute top-0 bottom-0 z-20'}
                />
                <div className="slider-track h-[5px] rounded-lg bg-gray-200 w-full absolute top-0 bottom-0 z-10"></div>
                <div
                  id="track-active"
                  className="slider-track-active h-[5px] rounded-lg bg-orange-400 absolute top-0 bottom-0 z-10"
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchModal);
