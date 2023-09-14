import React, { memo } from 'react';
import PostsItem from './PostsItem';

const PostsSidebar = () => {
  return (
    <div className="w-full min-h-[200px] p-5 flex flex-col bg-white shadow-lg rounded-lg gap-3">
      <h3 className="text-lg font-semibold">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-3">
        <PostsItem />
        
      </div>
    </div>
  );
};

export default memo(PostsSidebar);
