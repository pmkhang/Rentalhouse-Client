import React, { memo } from 'react';

const imges = [
  'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/09/04/img-1693806824428-1693806836017_1693806858.jpg',
  'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/09/04/img-1693805953730-1693805971153_1693806601.jpg',
  'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/09/04/img-1693805949449-1693805969466_1693806613.jpg',
  'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/09/04/img-1693805949424-1693805967867_1693806623.jpg',
];

const ListItem = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-2/5 flex gap-2 flex-wrap items-center">
        <img src={imges[0]} alt="Preview" className="w-[120px] h-[120px] object-cover rounded-lg" />
        <img src={imges[1]} alt="Preview" className="w-[120px] h-[120px] object-cover rounded-lg" />
        <img src={imges[2]} alt="Preview" className="w-[120px] h-[120px] object-cover rounded-lg" />
        <img src={imges[3]} alt="Preview" className="w-[120px] h-[120px] object-cover rounded-lg" />
      </div>
      <div className="w-3/5">Info</div>
    </div>
  );
};

export default memo(ListItem);
